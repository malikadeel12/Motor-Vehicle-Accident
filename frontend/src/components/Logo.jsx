export default function Logo({ className = "h-16 w-auto" }) {
  return (
    <div className={`flex flex-col items-start leading-tight ${className}`}>
      <span className="font-display font-bold text-lg tracking-widest text-[#d4af37]">
        ACCIDENT
      </span>
      <span className="font-display font-bold text-sm tracking-widest text-[#f5ebe1]">
        WIN CASE
      </span>
    </div>
  );
}
