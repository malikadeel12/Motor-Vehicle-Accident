import { motion } from "framer-motion";

const chaos = [
  "Medical bills piling up on the kitchen table.",
  "Insurance adjusters calling before you've even left the hospital.",
  "Paychecks that stopped the day everything changed.",
  "Forms. Deadlines. Fine print designed to trip you.",
];

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function HandleEverything() {
  return (
    <section data-testid="handle-everything-section" className="relative py-32 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16">
        <motion.div
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5"
        >
          <p className="text-[#b31b1b] uppercase tracking-[0.35em] text-xs mb-6">Right now, it's chaos</p>
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            We Handle
            <br />
            Everything.
          </h2>
          <div className="mt-10 space-y-5">
            {chaos.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="text-[#a89f95] text-lg leading-relaxed border-l-2 border-[#b31b1b]/40 pl-5"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-6 lg:col-start-7 lg:mt-32"
        >
          <div className="bg-[#1e191a] border border-white/5 p-10 lg:p-14 relative">
            <div className="absolute -top-px left-0 w-24 h-px bg-[#d4af37]" />
            <p className="text-[#d4af37] uppercase tracking-[0.35em] text-xs mb-6">Then, quiet</p>
            <p className="text-2xl lg:text-3xl leading-snug text-[#f5ebe1] font-light">
              The calls stop coming to you — they come to us. The bills get
              handled. The paperwork disappears from your table.
            </p>
            <p className="mt-8 text-lg text-[#a89f95] leading-relaxed">
              You focus on healing. We handle the rest. Every letter, every
              adjuster, every deadline. That's the whole point of us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
