import { motion } from "framer-motion";

const damages = [
  {
    title: "Medical Bills",
    text: "The ER, the surgeries, the months of physical therapy — every bill lands on our desk, not your kitchen table.",
  },
  {
    title: "Lost Wages",
    text: "Every paycheck you've missed — and the ones you're going to miss — counts toward what they owe you.",
  },
  {
    title: "Pain & Suffering",
    text: "Your pain didn't stop when the ambulance left. Neither does your claim.",
  },
  {
    title: "Physical Disability",
    text: "Life-altering injuries deserve life-supporting compensation. Maximum. Not the minimum they hope you'll take.",
  },
  {
    title: "Property Damage",
    text: "Your car's real value — not the lowball number an adjuster read off a screen.",
  },
  {
    title: "Emotional Distress",
    text: "The nightmares. The knot in your stomach behind the wheel. That suffering is real, and it counts.",
  },
];

export default function Damages() {
  return (
    <section data-testid="damages-section" className="relative py-32 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="lg:ml-auto lg:max-w-2xl lg:text-right"
        >
          <p className="font-hand text-[#d4af37] text-2xl mb-6">every dollar they owe you —</p>
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            What We Fight
            <br />
            to Recover.
          </h2>
          <p className="mt-6 text-lg text-[#a89f95] leading-relaxed">
            A crash costs more than a repair bill. We add up all of it — then we
            go get it.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {damages.map((d, i) => (
            <motion.div
              key={d.title}
              data-testid={`damage-item-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.12 }}
              className={`relative pl-8 border-l border-[#d4af37]/25 ${
                i % 2 === 1 ? "lg:mt-16" : ""
              } ${i % 3 === 2 ? "lg:max-w-md" : ""}`}
            >
              <span className="absolute -left-px top-0 h-10 w-px bg-[#b31b1b]" />
              <span className="font-display text-[#d4af37]/40 text-sm tracking-widest">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display font-semibold uppercase tracking-tight text-2xl lg:text-3xl text-[#f5ebe1]">
                {d.title}
              </h3>
              <p className="mt-4 text-lg text-[#a89f95] leading-relaxed">{d.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
