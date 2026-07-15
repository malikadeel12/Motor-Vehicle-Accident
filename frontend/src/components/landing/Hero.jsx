import { motion } from "framer-motion";
import { Star, Phone } from "lucide-react";
import CaseForm from "./CaseForm";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section data-testid="hero-section" className="relative min-h-screen flex items-center grain">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516319915504-015b432d407c?q=80&w=2000"
          alt="Red tail lights disappearing down a highway at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161314]/80 via-[#161314]/60 to-[#161314]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161314]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-32 pb-20 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-[#d4af37] uppercase tracking-[0.35em] text-xs sm:text-sm mb-8"
          >
            Motor Vehicle Accident Attorneys
          </motion.p>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            data-testid="hero-headline"
            className="font-display font-bold uppercase leading-[0.92] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            You Focus on Healing.
            <br />
            <span className="text-[#a89f95]">We Focus on</span>
            <br />
            <span className="text-[#b31b1b] underline-rough">Winning.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-10 text-lg md:text-xl text-[#cfc5ba] max-w-xl leading-relaxed"
          >
            If you've been injured, you shouldn't fight alone. Free consultation.{" "}
            <span className="font-hand text-[#d4af37] text-xl md:text-2xl">No fee unless we win.</span>
          </motion.p>

          <motion.a
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            href="tel:+17139197830"
            data-testid="hero-phone-link"
            className="mt-10 inline-flex items-center gap-3 text-[#d4af37] hover:text-[#e8c959] transition-colors"
          >
            <Phone size={22} strokeWidth={2.5} />
            <div className="text-left">
              <div className="text-xs uppercase tracking-[0.25em] text-[#a89f95]">Call 24/7</div>
              <div className="font-display text-2xl font-medium tracking-wide">(713) 919-7830</div>
            </div>
          </motion.a>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            data-testid="hero-trust-signals"
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#a89f95]"
          >
            <span className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />
              ))}
            </span>
            <span>1,000+ families helped</span>
            <span className="text-[#d4af37] font-medium">$100M+ recovered</span>
          </motion.div>
        </div>

        <motion.div
          id="case-review"
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="lg:col-span-5"
        >
          <CaseForm />
        </motion.div>
      </div>
    </section>
  );
}
