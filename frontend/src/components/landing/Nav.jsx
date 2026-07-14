import { Phone } from "lucide-react";
import Logo from "../Logo";

const scrollToForm = () => {
  document.getElementById("case-review")?.scrollIntoView({ behavior: "smooth" });
};

export default function Nav() {
  return (
    <header
      data-testid="main-nav"
      className="fixed top-0 left-0 right-0 z-50 bg-[#161314]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="/" data-testid="nav-logo" className="flex items-center gap-2">
          <Logo className="h-16" />
        </a>
        <div className="flex items-center gap-4 sm:gap-8">
          <a
            href="tel:5551234567"
            data-testid="nav-phone-link"
            className="flex items-center gap-2 text-[#d4af37] hover:text-[#e8c959] transition-colors"
          >
            <Phone size={16} strokeWidth={2.5} />
            <span className="font-display font-medium tracking-wide text-sm sm:text-base">
              (555) 123-4567
            </span>
          </a>
          <button
            onClick={scrollToForm}
            data-testid="nav-cta-button"
            className="hidden md:block bg-[#b31b1b] hover:bg-[#8a1515] text-[#f5ebe1] font-display uppercase tracking-wider text-sm px-6 py-3 transition-colors"
          >
            Free Case Review
          </button>
        </div>
      </div>
    </header>
  );
}
