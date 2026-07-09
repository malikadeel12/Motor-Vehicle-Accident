import { motion } from "framer-motion";

const quotes = [
  {
    quote: "I thought my life was over. They gave me my dignity back.",
    name: "Maria T.",
    detail: "T-boned at an intersection, 2023",
  },
  {
    quote: "I was terrified. They held my hand through everything. Every call, every hearing, every sleepless night.",
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
          <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            You're Not Alone.
          </h2>
        </motion.div>

        <motion.blockquote
          data-testid="testimonial-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="mt-20 max-w-4xl"
        >
          <p className="font-hand text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#f5ebe1]">
            "{quotes[0].quote}"
          </p>
          <footer className="mt-8 flex items-baseline gap-4">
            <span className="w-10 h-px bg-[#b31b1b] translate-y-[-4px]" />
            <div>
              <div className="font-display uppercase tracking-wide text-[#d4af37]">{quotes[0].name}</div>
              <div className="text-sm text-[#a89f95] mt-1">{quotes[0].detail}</div>
            </div>
          </footer>
        </motion.blockquote>

        <div className="mt-24 flex flex-col lg:flex-row gap-10 lg:gap-16 lg:justify-end">
          {quotes.slice(1).map((q, i) => (
            <motion.blockquote
              key={q.name}
              data-testid={`testimonial-${i + 1}`}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -1 : 0.8 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.2 }}
              className={`bg-[#1e191a]/80 backdrop-blur-sm border border-white/5 p-10 max-w-md ${
                i === 1 ? "lg:mt-20" : ""
              }`}
            >
              <p className="text-xl leading-snug text-[#f5ebe1] font-light">
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
