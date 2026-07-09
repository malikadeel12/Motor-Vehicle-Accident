import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import FinalPush from "@/components/landing/FinalPush";

export default function CaseReview() {
  return (
    <div data-testid="case-review-page" className="min-h-screen bg-[#161314] text-[#f5ebe1]">
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" data-testid="case-review-logo-link" className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold uppercase tracking-tight text-[#f5ebe1]">
              Meridian<span className="text-[#b31b1b]">&amp;</span>Rowe
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-[#a89f95]">
              Trial Lawyers
            </span>
          </Link>
          <a
            href="tel:5551234567"
            data-testid="case-review-phone-link"
            className="flex items-center gap-2 text-[#d4af37] hover:text-[#e8c959] transition-colors"
          >
            <Phone size={16} strokeWidth={2.5} />
            <span className="font-display font-medium tracking-wide text-sm sm:text-base">(555) 123-4567</span>
          </a>
        </div>
      </header>
      <FinalPush />
      <div className="pb-16 text-center">
        <Link to="/" data-testid="case-review-back-home" className="text-sm text-[#a89f95] hover:text-[#f5ebe1] transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
