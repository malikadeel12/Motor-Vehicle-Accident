import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function EstimateBanner() {
  return (
    <section data-testid="estimate-banner-section" className="relative py-24 lg:py-32 bg-[#100d0e] overflow-hidden">
      <span aria-hidden="true" className="absolute -top-8 left-6 lg:left-12 font-display font-bold text-[11rem] lg:text-[16rem] leading-none text-white/[0.025] select-none pointer-events-none">
        $?
      </span>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-hand text-[#d4af37] text-2xl mb-5">2 minutes. 6 questions.</p>
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            What's Your Case
            <br />
            Actually Worth?
          </h2>
          <p className="mt-5 text-lg text-[#a89f95] leading-relaxed max-w-lg">
            The insurance company already ran this math. Time you did too.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <Link
            to="/estimate"
            data-testid="estimate-banner-cta"
            className="group inline-flex items-center gap-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#161314] font-display uppercase tracking-wider text-lg px-10 py-5 transition-all"
          >
            Calculate My Estimate
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
