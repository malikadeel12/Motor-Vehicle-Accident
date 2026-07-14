export default function Logo({ className = "h-16 w-auto" }) {
  return (
    <div className={`flex flex-col items-start leading-none ${className}`}>
      <span className="font-display font-bold text-lg tracking-[0.3em] text-[#b31b1b] uppercase">
        Accident
      </span>
      <span className="font-display font-bold text-base tracking-[0.35em] text-[#f5ebe1] uppercase">
        Case Win
      </span>
    </div>
  );
}
