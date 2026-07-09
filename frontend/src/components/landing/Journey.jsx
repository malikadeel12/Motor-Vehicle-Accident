import { motion } from "framer-motion";
import { PhoneCall, Flame, Trophy } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "The Call",
    text: "You tell us what happened. We listen. All of it. The crash, the fear, the 2 AM worries. No charge. No pressure. No judgment.",
  },
  {
    icon: Flame,
    title: "The Fight",
    text: "We take over every conversation with the insurance company. They stop calling you. We build your case like it's going to trial, because they need to believe it will.",
  },
  {
    icon: Trophy,
    title: "The Win",
    text: "You get what your life is actually worth, not what an adjuster hoped you'd settle for. And you never pay us a cent unless we win.",
  },
];

export default function Journey() {
  return (
    <section data-testid="journey-section" className="relative py-32 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="lg:ml-auto lg:max-w-2xl lg:text-right"
        >
          <p className="font-hand text-[#a89f95] text-2xl mb-6">no mystery, no jargon.</p>
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            What Actually
            <br />
            Happens.
          </h2>
        </motion.div>

        <div className="mt-24 relative">
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#b31b1b] via-[#d4af37]/50 to-[#d4af37]" />
          <div className="space-y-24">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  data-testid={`journey-step-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex gap-10 pl-16 lg:w-1/2 ${
                    i % 2 === 1 ? "lg:ml-auto lg:pl-20" : "lg:pl-0 lg:pr-16 lg:text-right lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`absolute left-6 top-1 -translate-x-1/2 w-12 h-12 flex items-center justify-center bg-[#161314] border border-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.25)] ${
                      i % 2 === 1 ? "lg:left-0" : "lg:left-auto lg:-right-6 lg:translate-x-0"
                    }`}
                  >
                    <Icon size={20} className="text-[#d4af37]" />
                  </div>
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -top-14 font-display font-bold text-[9rem] leading-none text-white/[0.035] select-none pointer-events-none ${
                        i % 2 === 1 ? "left-0" : "lg:right-0 left-0 lg:left-auto"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="relative font-display font-semibold uppercase text-3xl lg:text-4xl tracking-tight">
                      {s.title}
                    </h3>
                    <p className="relative mt-4 text-lg text-[#a89f95] leading-relaxed max-w-md">{s.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
