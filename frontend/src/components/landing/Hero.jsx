import { motion } from "framer-motion";
import { Star, Phone } from "lucide-react";
import { scrollToForm } from "./Nav";

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
    <section data-testid="hero-section" className="relative min-h-screen flex items-end grain">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516319915504-015b432d407c?q=80&w=2000"
          alt="Red tail lights disappearing down a highway at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161314]/80 via-[#161314]/60 to-[#161314]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161314]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-40 pb-24">
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-[#d4af37] uppercase tracking-[0.35em] text-xs sm:text-sm mb-8"
        >
          Motor Vehicle Accident Attorneys
        </motion.p>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          data-testid="hero-headline"
          className="font-display font-bold uppercase leading-[0.92] tracking-tight text-5xl sm:text-6xl lg:text-[7.5rem] max-w-5xl"
        >
          You Focus on Healing.
          <br />
          <span className="text-[#a89f95]">We Focus on</span>
          <br />
          <span className="text-[#b31b1b]">Winning.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-10 text-lg md:text-xl text-[#cfc5ba] max-w-xl leading-relaxed"
        >
          If you've been injured, you shouldn't fight alone. Free consultation.
          No fee unless we win.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6"
        >
          <button
            onClick={scrollToForm}
            data-testid="hero-cta-button"
            className="bg-[#b31b1b] hover:bg-[#8a1515] text-[#f5ebe1] font-display uppercase tracking-wider text-lg px-10 py-5 transition-all shadow-[0_0_40px_rgba(179,27,27,0.35)] hover:shadow-[0_0_60px_rgba(179,27,27,0.5)]"
          >
            Get Your Free Case Review
          </button>
          <a
            href="tel:5551234567"
            data-testid="hero-phone-link"
            className="flex items-center gap-3 text-[#d4af37] hover:text-[#e8c959] transition-colors"
          >
            <Phone size={22} strokeWidth={2.5} />
            <div className="text-left">
              <div className="text-xs uppercase tracking-[0.25em] text-[#a89f95]">Call 24/7</div>
              <div className="font-display text-2xl font-medium tracking-wide">(555) 123-4567</div>
            </div>
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          data-testid="hero-trust-signals"
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#a89f95]"
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
    </section>
  );
}
