import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Loader2 } from "lucide-react";

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

// This exact text is what the visitor consents to, and it is what TrustedForm
// records via the `data-tf-consent` element below. Keep the rendered copy and
// the value sent to the server identical so the certificate matches the lead.
// NOTE: This is standard TCPA-style clickwrap language — have your own counsel
// confirm the final wording before going live.
const CONSENT_TEXT =
  'By clicking "Get Help Now", I agree to the Terms of Service and Privacy Policy, and authorize Accident Case Win to contact me via phone, text, or email at the number and address I provided — including by automated means — regarding my potential case. Consent is not a condition of any purchase. Message and data rates may apply.';

// Where the lead (and the captured TrustedForm certificate URL) is sent.
// Defaults to the Vercel serverless function in /api/lead.js. Override with
// REACT_APP_LEAD_ENDPOINT if you host the handler elsewhere.
const LEAD_ENDPOINT = process.env.REACT_APP_LEAD_ENDPOINT || "/api/lead";

const inputClass =
  "bg-transparent border-b border-white/15 focus:border-[#d4af37] outline-none py-3 text-[#f5ebe1] placeholder-[#a89f95]/60 transition-colors";

export default function CaseForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Read values synchronously, before any state update re-renders the form.
    // The TrustedForm script writes the certificate URL into the uncontrolled
    // hidden field, and FormData picks up its current DOM value here.
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k) => (fd.get(k) || "").toString().trim();

    const payload = {
      firstName: get("firstName"),
      lastName: get("lastName"),
      phone: get("phone"),
      email: get("email"),
      zip: get("zip"),
      state: get("state"),
      trustedFormCertUrl: get("xxTrustedFormCertUrl"),
      consentText: CONSENT_TEXT,
      consentTimestamp: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      company: get("company"), // honeypot — real users leave this empty
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your request. Please call us at (713) 919-7830 and we'll help right away.",
      );
    }
  };

  const submitted = status === "success";
  const submitting = status === "submitting";

  return (
    <div className="bg-[#1e191a] border border-white/5 p-8 lg:p-12 relative">
      <div className="absolute -top-px left-0 w-24 h-px bg-[#b31b1b]" />
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirm"
            data-testid="form-confirmation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="py-12 text-center"
          >
            <HeartHandshake size={48} className="mx-auto text-[#d4af37]" strokeWidth={1.5} />
            <h3 className="mt-6 font-display font-semibold uppercase text-3xl tracking-tight">
              We've got it from here.
            </h3>
            <p className="mt-4 text-[#a89f95] text-lg leading-relaxed max-w-md mx-auto">
              A real person, not a robot, will call you within the hour.
              Take a breath. <span className="font-hand text-[#d4af37] text-xl">You did the hard part.</span>
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            data-testid="case-review-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h3 className="font-display font-semibold uppercase text-2xl lg:text-3xl tracking-tight">
              Tell us what happened.
            </h3>
            <p className="text-[#a89f95] text-sm">
              Free. Confidential. No fee unless we win.
            </p>
            <div className="flex gap-6">
              <input
                required
                name="firstName"
                data-testid="form-first-name-input"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                className={`w-1/2 ${inputClass}`}
              />
              <input
                required
                name="lastName"
                data-testid="form-last-name-input"
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                className={`w-1/2 ${inputClass}`}
              />
            </div>
            <input
              required
              name="phone"
              data-testid="form-phone-input"
              data-tf-sensitive="true"
              type="tel"
              autoComplete="tel"
              placeholder="Phone number"
              className={`w-full ${inputClass}`}
            />
            <input
              required
              name="email"
              data-testid="form-email-input"
              data-tf-sensitive="true"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className={`w-full ${inputClass}`}
            />
            <div className="flex gap-6">
              <input
                required
                name="zip"
                data-testid="form-zip-input"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                pattern="[0-9]{5}"
                maxLength={5}
                placeholder="ZIP code"
                className={`w-1/2 ${inputClass}`}
              />
              <select
                required
                name="state"
                defaultValue=""
                data-testid="form-state-select"
                className={`w-1/2 ${inputClass} [&>option]:bg-[#1e191a]`}
              >
                <option value="" disabled className="text-[#a89f95]">State</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Honeypot: hidden from users, catches bots. Server drops if filled. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {status === "error" && (
              <p data-testid="form-error" role="alert" className="text-[#e79a9a] text-sm leading-relaxed">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              data-testid="form-submit-button"
              className="w-full bg-[#b31b1b] hover:bg-[#8a1515] disabled:opacity-60 disabled:cursor-not-allowed text-[#f5ebe1] font-display uppercase tracking-wider text-lg py-5 transition-all shadow-[0_0_40px_rgba(179,27,27,0.3)] inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending…
                </>
              ) : (
                "Get Help Now"
              )}
            </button>

            {/* Populated by the TrustedForm script (see public/index.html).
                Uncontrolled on purpose so React never overwrites the value. */}
            <input type="hidden" id="xxTrustedFormCertUrl" name="xxTrustedFormCertUrl" defaultValue="" />

            <p data-tf-consent="true" className="text-[#a89f95] text-xs leading-relaxed">
              {CONSENT_TEXT}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
