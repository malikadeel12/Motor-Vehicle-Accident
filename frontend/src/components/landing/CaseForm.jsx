import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake } from "lucide-react";

export default function CaseForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              A real person — not a robot — will call you within the hour.
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
            <input
              required
              data-testid="form-name-input"
              type="text"
              placeholder="Your name"
              className="w-full bg-transparent border-b border-white/15 focus:border-[#d4af37] outline-none py-3 text-[#f5ebe1] placeholder-[#a89f95]/60 transition-colors"
            />
            <input
              required
              data-testid="form-phone-input"
              type="tel"
              placeholder="Phone number"
              className="w-full bg-transparent border-b border-white/15 focus:border-[#d4af37] outline-none py-3 text-[#f5ebe1] placeholder-[#a89f95]/60 transition-colors"
            />
            <textarea
              data-testid="form-message-input"
              rows={3}
              placeholder="What happened? (in your own words — no legal talk needed)"
              className="w-full bg-transparent border-b border-white/15 focus:border-[#d4af37] outline-none py-3 text-[#f5ebe1] placeholder-[#a89f95]/60 transition-colors resize-none"
            />
            <button
              type="submit"
              data-testid="form-submit-button"
              className="w-full bg-[#b31b1b] hover:bg-[#8a1515] text-[#f5ebe1] font-display uppercase tracking-wider text-lg py-5 transition-all shadow-[0_0_40px_rgba(179,27,27,0.3)]"
            >
              Get Help Now
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
