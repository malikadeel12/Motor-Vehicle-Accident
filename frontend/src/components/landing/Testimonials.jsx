import { motion } from "framer-motion";

const quotes = [
  {
    quote: "I thought my life was over. They gave me my dignity back.",
    name: "Maria T.",
    detail: "T-boned at an intersection, 2023",
  },
  {
    quote: "I was terrified. They held my hand through everything — every call, every hearing, every sleepless night.",
    name: "James R.",
    detail: "Hit by a drunk driver, 2024",
  },
  {
    quote: "The insurance company treated me like a case number. Meridian & Rowe treated me like family.",
    name: "Denise W.",
    detail: "Highway pile-up, 2023",
  },
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials-section" className="relative py-32 lg:py-44 grain overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1639070882750-99dd6ba7dff6?q=80&w=2000"
          alt="Silhouettes standing together in the dark"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161314] via-[#161314]/80 to-[#161314]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-[#d4af37] uppercase tracking-[0.35em] text-xs mb-6">In their words</p>
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            You're Not Alone.
          </h2>
        </motion.div>

        <div className="mt-20 grid lg:grid-cols-12 gap-10">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={q.name}
              data-testid={`testimonial-${i}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              className={`bg-[#1e191a]/80 backdrop-blur-sm border border-white/5 p-10 flex flex-col justify-between ${
                i === 0 ? "lg:col-span-5" : i === 1 ? "lg:col-span-4 lg:mt-16" : "lg:col-span-3 lg:mt-8"
              }`}
            >
              <p className="text-xl lg:text-2xl leading-snug text-[#f5ebe1] font-light">
                <span className="text-[#b31b1b] font-display text-4xl leading-none mr-1">"</span>
                {q.quote}
              </p>
              <footer className="mt-8">
                <div className="font-display uppercase tracking-wide text-[#d4af37]">{q.name}</div>
                <div className="text-sm text-[#a89f95] mt-1">{q.detail}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
