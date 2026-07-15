// api/lead.js — Vercel Serverless Function (Node runtime).
//
// Flow:
//   1. Receives the case-review lead from the frontend (src/components/landing/CaseForm.jsx).
//   2. Stores it in Supabase (source of truth) so nothing is ever lost.
//   3. Claims the TrustedForm certificate server-side using your API key.
//
// This file runs ONLY on Vercel's servers, never in the browser, so it is the
// correct place for secrets. Configure these in
//   Vercel → Project → Settings → Environment Variables
// (and locally in a git-ignored .env for `vercel dev`):
//
//   SUPABASE_URL                 e.g. https://xxxxxxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY    Supabase "service_role" key — server-only, bypasses RLS
//   TRUSTEDFORM_API_KEY          Your TrustedForm / ActiveProspect API key
//   TRUSTEDFORM_VENDOR           (optional) label recorded on the claim; default "Accident Case Win"
//
// NEVER prefix any of the above with REACT_APP_ — that would bundle them into
// the public frontend.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TRUSTEDFORM_API_KEY = process.env.TRUSTEDFORM_API_KEY;
const TRUSTEDFORM_VENDOR = process.env.TRUSTEDFORM_VENDOR || "Accident Case Win";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Vercel parses JSON bodies automatically; guard against a raw string too.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  // Honeypot: bots fill the hidden "company" field. Pretend success, store nothing.
  if (str(body.company)) {
    return res.status(200).json({ ok: true });
  }

  const lead = {
    firstName: str(body.firstName),
    lastName: str(body.lastName),
    phone: str(body.phone),
    email: str(body.email),
    zip: str(body.zip),
    state: str(body.state),
    trustedFormCertUrl: str(body.trustedFormCertUrl),
    consentText: str(body.consentText),
    consentTimestamp: str(body.consentTimestamp),
    pageUrl: str(body.pageUrl),
  };

  console.log("[lead] Received payload:", { ...lead, trustedFormCertUrl: lead.trustedFormCertUrl ? "SET" : "EMPTY" });
  console.log("[lead] Full cert URL:", lead.trustedFormCertUrl);

  if (!lead.firstName || !lead.lastName || !lead.phone || !lead.email || !lead.zip || !lead.state) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[lead] Supabase env vars are not configured.");
    return res.status(500).json({ error: "Server is not configured. Please call us." });
  }

  // 1) Persist the lead first — the raw certificate URL is always saved even if
  //    the claim below fails, so a lead is never dropped.
  let leadId = null;
  try {
    const row = {
      first_name: lead.firstName,
      last_name: lead.lastName,
      phone: lead.phone,
      email: lead.email,
      zip: lead.zip,
      state: lead.state,
      trusted_form_cert_url: lead.trustedFormCertUrl || null,
      consent_text: lead.consentText || null,
      consent_at: lead.consentTimestamp || null,
      page_url: lead.pageUrl || null,
      user_agent: str(req.headers["user-agent"]) || null,
      ip: clientIp(req),
      claim_status: "pending",
    };

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(row),
    });

    if (!insertRes.ok) {
      const detail = await insertRes.text().catch(() => "");
      console.error("[lead] Supabase insert failed:", insertRes.status, detail);
      return res.status(502).json({ error: "Could not save your request. Please call us." });
    }

    const inserted = await insertRes.json().catch(() => []);
    leadId = Array.isArray(inserted) && inserted[0] ? inserted[0].id : null;
  } catch (err) {
    console.error("[lead] Supabase insert error:", err);
    return res.status(502).json({ error: "Could not save your request. Please call us." });
  }

  // 2) Retain the TrustedForm certificate. Best-effort: a failure here must never
  //    fail the request, because the lead + cert URL are already stored.
  //
  //    Configured for the TrustedForm **Retain** product: POST to the certificate
  //    URL with HTTP Basic auth (username `API`, password = your API key). The
  //    `retain` object is what triggers retention and carries your reference +
  //    vendor; `match_lead` fingerprint-matches the consumer's email/phone against
  //    the certificate (send digits-only phone for a reliable match).
  //    Docs: https://developer.activeprospect.com/section/trustedform-certificates/
  const claim = { attempted: false };
  if (TRUSTEDFORM_API_KEY && lead.trustedFormCertUrl && isTrustedFormUrl(lead.trustedFormCertUrl)) {
    claim.attempted = true;
    claim.certUrl = lead.trustedFormCertUrl;
    try {
      const auth = Buffer.from(`API:${TRUSTEDFORM_API_KEY}`).toString("base64");
      console.log("[lead] Claiming TrustedForm cert:", lead.trustedFormCertUrl);
      const tfRes = await fetch(lead.trustedFormCertUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          match_lead: {
            email: lead.email,
            phone: digitsOnly(lead.phone),
          },
          retain: {
            reference: leadId ? String(leadId) : undefined,
            vendor: TRUSTEDFORM_VENDOR,
          },
        }),
      });

      claim.status = tfRes.status;
      claim.ok = tfRes.ok;
      const tfData = await tfRes.json().catch(() => ({}));
      claim.outcome = tfData && tfData.outcome ? tfData.outcome : undefined;
      console.log("[lead] TrustedForm claim result:", { status: tfRes.status, ok: tfRes.ok, outcome: claim.outcome, response: tfData });

      // Record the outcome back on the lead row (best-effort).
      if (leadId) {
        await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${encodeURIComponent(leadId)}`, {
          method: "PATCH",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            claim_status: tfRes.ok ? "retained" : "failed",
            claim_response: tfData || null,
          }),
        }).catch((e) => console.error("[lead] claim status patch failed:", e));
      }
    } catch (err) {
      console.error("[lead] TrustedForm claim error:", err);
      claim.ok = false;
      claim.error = String(err);
    }
  } else {
    if (!TRUSTEDFORM_API_KEY) console.warn("[lead] TRUSTEDFORM_API_KEY not set");
    if (!lead.trustedFormCertUrl) console.warn("[lead] No trustedFormCertUrl in payload");
    if (lead.trustedFormCertUrl && !isTrustedFormUrl(lead.trustedFormCertUrl)) console.warn("[lead] Invalid cert URL:", lead.trustedFormCertUrl);
  }

  return res.status(200).json({ ok: true, id: leadId, claim });
};

function str(v) {
  return v === undefined || v === null ? "" : String(v).trim();
}

function digitsOnly(v) {
  return str(v).replace(/\D/g, "");
}

function clientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return String(xff).split(",")[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : null;
}

function isTrustedFormUrl(url) {
  try {
    return new URL(url).hostname.endsWith("trustedform.com");
  } catch {
    return false;
  }
}
