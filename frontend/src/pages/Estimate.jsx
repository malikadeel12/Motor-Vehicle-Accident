import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    key: "injured",
    q: "Were you physically injured in the accident?",
    type: "single",
    tip: "The type and severity of your injuries drive most of your case value.",
    options: ["Yes", "No"],
  },
  {
    key: "when",
    q: "When did the accident happen?",
    type: "single",
    tip: "Recent accidents tend to settle higher — evidence is fresh, deadlines are far away.",
    options: ["Within 1 month", "Within 6 months", "Within 1 year", "Within 2 years", "More than 2 years ago"],
  },
  {
    key: "injuries",
    q: "What kind of injuries? Pick all that apply.",
    type: "multi",
    tip: "Every injury counts — even the ones that showed up days later.",
    options: ["Whiplash & soft tissue", "Broken bones", "Back & neck injury", "Burns", "Traumatic brain injury", "Something else"],
  },
  {
    key: "severity",
    q: "How severe are your injuries?",
    type: "single",
    tip: "Be honest here. Severe injuries deserve maximum compensation — not the minimum.",
    options: ["Minor", "Moderate", "Severe", "Critical", "Life-threatening"],
  },
  {
    key: "treatment",
    q: "What treatment have you received so far?",
    type: "multi",
    tip: "Medical records are proof. The more treatment, the stronger your case.",
    options: ["Ambulance ride", "Treated at a hospital", "Treated at a clinic", "Ongoing physical therapy", "None yet"],
  },
  {
    key: "fault",
    q: "Were you at fault?",
    type: "single",
    tip: "Even partial fault doesn't kill your case. Don't let an adjuster tell you otherwise.",
    options: ["No, not at all", "Partially", "Yes", "I'm not sure"],
  },
];

const PROOF = [
  { name: "Daniel P.", state: "NV", amount: "$237,156" },
  { name: "Lisa W.", state: "NY", amount: "$281,587" },
  { name: "Matthew A.", state: "CA", amount: "$179,325" },
  { name: "Ashley T.", state: "TX", amount: "$218,591" },
  { name: "Jessica M.", state: "FL", amount: "$312,940" },
  { name: "Robert K.", state: "IL", amount: "$156,780" },
];

function calcEstimate(answers) {
  const sevBase = { Minor: 15000, Moderate: 40000, Severe: 90000, Critical: 175000, "Life-threatening": 300000 };
  let total = sevBase[answers.severity] || 15000;
  if (answers.injured === "No") total = 8000;
  const injuries = answers.injuries || [];
  total += injuries.length * 12000;
  if (injuries.includes("Traumatic brain injury")) total += 40000;
  const treatment = answers.treatment || [];
  const tAdd = { "Ambulance ride": 8000, "Treated at a hospital": 15000, "Treated at a clinic": 6000, "Ongoing physical therapy": 12000 };
  treatment.forEach((t) => (total += tAdd[t] || 0));
  const whenMult = { "Within 1 month": 1.15, "Within 6 months": 1.1, "Within 1 year": 1.0, "Within 2 years": 0.85, "More than 2 years ago": 0.6 };
  total *= whenMult[answers.when] || 1;
  const faultMult = { "No, not at all": 1.0, "I'm not sure": 0.9, Partially: 0.7, Yes: 0.4 };
  total *= faultMult[answers.fault] || 1;
  const round = (n) => Math.max(5000, Math.round(n / 1000) * 1000);
  return { low: round(total * 0.7), high: round(total * 1.6) };
}

const fmt = (n) => "$" + n.toLocaleString();

function ProofToast() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PROOF.length), 6000);
    return () => clearInterval(t);
  }, []);
  const p = PROOF[i];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={i}
        data-testid="estimate-proof-toast"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.5 }}
        className="text-sm text-[#a89f95]"
      >
        {p.name} ({p.state}) was just offered <span className="text-[#d4af37] font-medium">{p.amount}</span>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Estimate() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multi, setMulti] = useState([]);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [revealed, setRevealed] = useState(false);

  const current = STEPS[step];
  const atContact = step === STEPS.length;
  const progress = Math.min(((revealed ? STEPS.length + 1 : step) / (STEPS.length + 1)) * 100, 100);

  const pickSingle = (opt) => {
    setAnswers((a) => ({ ...a, [current.key]: opt }));
    setStep((s) => s + 1);
  };
  const toggleMulti = (opt) => setMulti((m) => (m.includes(opt) ? m.filter((x) => x !== opt) : [...m, opt]));
  const nextMulti = () => {
    if (!multi.length) return;
    setAnswers((a) => ({ ...a, [current.key]: multi }));
    setMulti([]);
    setStep((s) => s + 1);
  };
  const reveal = (e) => {
    e.preventDefault();
    setRevealed(true);
  };

  const est = revealed ? calcEstimate(answers) : null;

  return (
    <div data-testid="estimate-page" className="min-h-screen bg-[#161314] text-[#f5ebe1] flex flex-col">
      <header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" data-testid="estimate-logo-link" className="font-display text-xl font-semibold uppercase tracking-tight">
            Meridian<span className="text-[#b31b1b]">&amp;</span>Rowe
          </Link>
          <div className="hidden sm:block"><ProofToast /></div>
          <a href="tel:5551234567" data-testid="estimate-phone-link" className="flex items-center gap-2 text-[#d4af37] hover:text-[#e8c959] transition-colors">
            <Phone size={16} strokeWidth={2.5} />
            <span className="font-display font-medium tracking-wide">(555) 123-4567</span>
          </a>
        </div>
        <div className="h-1 bg-white/5">
          <div data-testid="estimate-progress" className="h-full bg-[#b31b1b] transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-16 lg:py-24">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {revealed ? (
              <motion.div key="result" data-testid="estimate-result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-center">
                <p className="font-hand text-[#d4af37] text-2xl">based on what you told us —</p>
                <p className="mt-6 text-[#a89f95] uppercase tracking-[0.3em] text-xs">Your case could be worth</p>
                <div className="mt-6 font-display font-bold text-[#d4af37] leading-none text-5xl sm:text-6xl lg:text-8xl tracking-tight">
                  {fmt(est.low)} <span className="text-[#a89f95] text-3xl lg:text-5xl">—</span> {fmt(est.high)}
                </div>
                <p className="mt-8 text-lg text-[#a89f95] leading-relaxed max-w-lg mx-auto">
                  {contact.name.split(" ")[0]}, insurance companies count on you not knowing this number.
                  Now you do. Let's go get it.
                </p>
                <a href="tel:5551234567" data-testid="estimate-call-button" className="mt-10 inline-flex items-center gap-3 bg-[#b31b1b] hover:bg-[#8a1515] text-[#f5ebe1] font-display uppercase tracking-wider text-lg px-10 py-5 transition-all shadow-[0_0_40px_rgba(179,27,27,0.35)]">
                  <Phone size={20} /> Call Now — It's Free
                </a>
                <p className="mt-6 text-sm text-[#a89f95]">No fee unless we win. A real person will also call you shortly.</p>
                <p className="mt-10 text-xs text-[#a89f95]/40 max-w-md mx-auto leading-relaxed">
                  This is an informational estimate only, not legal advice or a guarantee. Every case is different — actual value depends on the specific facts.
                </p>
                <Link to="/" data-testid="estimate-back-home" className="mt-8 inline-block text-sm text-[#a89f95] hover:text-[#f5ebe1] transition-colors">← Back to home</Link>
              </motion.div>
            ) : atContact ? (
              <motion.form key="contact" data-testid="estimate-contact-form" onSubmit={reveal} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
                <h1 className="font-display font-bold uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight text-center">
                  Your estimate is ready.
                </h1>
                <p className="mt-4 text-center text-[#a89f95] text-lg">Tell us who to show it to.</p>
                <div className="mt-10 space-y-6 max-w-md mx-auto">
                  <input required data-testid="estimate-name-input" type="text" placeholder="Your name" value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} className="w-full bg-transparent border-b border-white/15 focus:border-[#d4af37] outline-none py-3 placeholder-[#a89f95]/60 transition-colors" />
                  <input required data-testid="estimate-phone-input" type="tel" placeholder="Phone number" value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} className="w-full bg-transparent border-b border-white/15 focus:border-[#d4af37] outline-none py-3 placeholder-[#a89f95]/60 transition-colors" />
                  <button type="submit" data-testid="estimate-reveal-button" className="w-full bg-[#b31b1b] hover:bg-[#8a1515] font-display uppercase tracking-wider text-lg py-5 transition-all shadow-[0_0_40px_rgba(179,27,27,0.3)]">
                    Show My Estimate
                  </button>
                  <p className="text-center text-xs text-[#a89f95]/60">Free. Confidential. No spam — ever.</p>
                </div>
              </motion.form>
            ) : (
              <motion.div key={current.key} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <p className="text-center text-xs uppercase tracking-[0.3em] text-[#a89f95]">
                  Question {step + 1} of {STEPS.length}
                </p>
                <h1 data-testid="estimate-question" className="mt-6 font-display font-bold uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight text-center">
                  {current.q}
                </h1>
                <div className={`mt-12 ${current.options.length <= 2 ? "flex justify-center gap-4" : "space-y-4 max-w-md mx-auto"}`}>
                  {current.options.map((opt, i) => {
                    const selected = current.type === "multi" && multi.includes(opt);
                    return (
                      <button
                        key={opt}
                        data-testid={`estimate-option-${i}`}
                        onClick={() => (current.type === "single" ? pickSingle(opt) : toggleMulti(opt))}
                        className={`block w-full text-left px-6 py-4 border transition-all duration-200 font-medium text-lg ${
                          current.options.length <= 2 ? "w-auto px-12 text-center" : ""
                        } ${
                          selected
                            ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                            : "border-white/15 bg-[#1e191a] hover:border-[#d4af37]/60 hover:bg-white/[0.03]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {current.type === "multi" && (
                  <div className="mt-8 text-center">
                    <button
                      data-testid="estimate-next-button"
                      onClick={nextMulti}
                      disabled={!multi.length}
                      className="inline-flex items-center gap-2 bg-[#b31b1b] hover:bg-[#8a1515] disabled:opacity-40 disabled:cursor-not-allowed font-display uppercase tracking-wider px-10 py-4 transition-all"
                    >
                      Next <ChevronRight size={18} />
                    </button>
                  </div>
                )}
                <p className="mt-12 text-center font-hand text-xl text-[#a89f95]">
                  <span className="text-[#d4af37]">—</span> {current.tip}
                </p>
                {step > 0 && (
                  <button data-testid="estimate-back-button" onClick={() => setStep((s) => s - 1)} className="mt-10 mx-auto flex items-center gap-2 text-sm text-[#a89f95]/60 hover:text-[#f5ebe1] transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
