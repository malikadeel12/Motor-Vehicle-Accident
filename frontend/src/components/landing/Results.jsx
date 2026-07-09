import { motion } from "framer-motion";

const results = [
  {
    amount: "$5.2M",
    story: "For a single mother who couldn't work after her crash. The insurance company offered $40,000. We said no.",
    tag: "Highway collision",
  },
  {
    amount: "$1.2M",
    story: "Sarah's insurance offered $15,000 and called it generous. We got her enough to never worry about her surgeries again.",
    tag: "Rear-end crash",
  },
  {
    amount: "$3.8M",
    story: "A father of three, hit by a distracted commercial driver. The company lawyered up. So did he.",
    tag: "Truck accident",
  },
];

export default function Results() {
  return (
    <section data-testid="results-section" className="relative py-32 lg:py-44 bg-[#100d0e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl"
        >
          <p className="text-[#d4af37] uppercase tracking-[0.35em] text-xs mb-6">The proof</p>
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            Real Results.
            <br />
            Real People.
          </h2>
          <p className="mt-6 text-lg text-[#a89f95] leading-relaxed">
            These aren't numbers on a wall. They're mortgages saved, surgeries
            paid for, futures put back together.
          </p>
        </motion.div>

        <div className="mt-20 space-y-16 lg:space-y-24">
          {results.map((r, i) => (
            <motion.div
              key={r.amount}
              data-testid={`result-item-${i}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col lg:flex-row gap-6 lg:gap-16 lg:items-end border-b border-white/5 pb-16 ${
                i % 2 === 1 ? "lg:flex-row-reverse lg:text-right" : ""
              }`}
            >
              <div className="font-display font-bold text-[#d4af37] leading-none text-7xl sm:text-8xl lg:text-[9rem] tracking-tight">
                {r.amount}
              </div>
              <div className={`max-w-md pb-2 ${i % 2 === 1 ? "lg:ml-0 lg:mr-auto" : "lg:ml-auto"}`}>
                <p className="text-xl leading-relaxed text-[#f5ebe1]">{r.story}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#b31b1b]">{r.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-12 text-sm text-[#a89f95]/60"
        >
          Past results do not guarantee future outcomes. Every case is different.
        </motion.p>
      </div>
    </section>
  );
}
