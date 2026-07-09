import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const types = [
  { name: "Personal Auto", note: "The everyday drive that changed everything." },
  { name: "Commercial Trucks", note: "Big rigs come with big legal teams. Now, so do you." },
  { name: "Rideshare", note: "Uber, Lyft. Their insurance maze is our home turf." },
  { name: "Motorcycle", note: "The bias against riders is real. We shut it down." },
  { name: "Bus", note: "Public or private, someone is accountable." },
  { name: "Bicycle", note: "You had every right to that road." },
  { name: "Pedestrian", note: "You were walking. They were driving. Enough said." },
  { name: "Train", note: "Rare. Complex. Devastating. We've been there." },
];

export default function AccidentTypes() {
  return (
    <section data-testid="accident-types-section" className="relative py-32 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="max-w-2xl"
        >
          <p className="font-hand text-[#d4af37] text-2xl mb-6">car, truck, bike. it doesn't matter.</p>
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            No Matter the Crash,
            <br />
            <span className="text-[#b31b1b]">We've Got You.</span>
          </h2>
        </motion.div>

        <div className="mt-20 border-t border-white/10">
          {types.map((t, i) => (
            <motion.div
              key={t.name}
              data-testid={`accident-type-${i}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-10 border-b border-white/10 py-6 lg:py-8 cursor-default transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex items-baseline gap-5">
                <span className="text-xs text-[#a89f95]/50 font-display w-8">0{i + 1}</span>
                <span className="font-display font-semibold uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[#f5ebe1] transition-colors group-hover:text-[#d4af37]">
                  {t.name}
                </span>
                <ArrowUpRight
                  size={22}
                  className="text-[#b31b1b] opacity-0 -translate-y-1 translate-x-[-6px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 hidden sm:block"
                />
              </div>
              <p className="text-[#a89f95] sm:text-right sm:max-w-xs pl-[3.25rem] sm:pl-0 leading-relaxed">
                {t.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
