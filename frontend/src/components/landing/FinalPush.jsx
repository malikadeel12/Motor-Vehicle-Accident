import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import CaseForm from "./CaseForm";

export default function FinalPush() {
  return (
    <section id="case-review" data-testid="final-push-section" className="relative py-32 lg:py-44 bg-[#100d0e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-6"
        >
          <p className="text-[#b31b1b] uppercase tracking-[0.35em] text-xs mb-6">Time matters</p>
          <h2
            data-testid="final-push-headline"
            className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-7xl"
          >
            Don't Let Them
            <br />
            Run Out
            <br />
            <span className="text-[#d4af37]">the Clock.</span>
          </h2>
          <p className="mt-8 text-lg text-[#a89f95] leading-relaxed max-w-lg">
            Insurance companies hope you'll wait. Every day you wait is a day
            they win. Evidence fades. Deadlines pass. Don't give them that.
          </p>
          <a
            href="tel:5551234567"
            data-testid="final-push-phone-link"
            className="mt-10 inline-flex items-center gap-3 text-[#d4af37] hover:text-[#e8c959] transition-colors"
          >
            <Phone size={22} strokeWidth={2.5} />
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#a89f95]">
                Or call us anytime. We're here.
              </div>
              <div className="font-display text-3xl font-medium tracking-wide">(555) 123-4567</div>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-5 lg:col-start-8"
        >
          <CaseForm />
        </motion.div>
      </div>
    </section>
  );
}
