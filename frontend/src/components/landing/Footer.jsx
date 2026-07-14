import Logo from "../Logo";

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="bg-[#0c0a0b] border-t border-white/5 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <div>
            <Logo className="h-24" />
            <p className="mt-3 font-hand text-xl text-[#a89f95]">We're here when you need us.</p>
          </div>
          <a
            href="tel:5551234567"
            data-testid="footer-phone-link"
            className="font-display font-bold text-4xl sm:text-5xl text-[#d4af37] hover:text-[#e8c959] transition-colors tracking-tight"
          >
            (555) 123-4567
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-6 text-sm text-[#a89f95]/70">
          <div className="flex gap-8">
            <a href="#case-review" className="hover:text-[#f5ebe1] transition-colors" data-testid="footer-link-review">Free Case Review</a>
            <a href="tel:5551234567" className="hover:text-[#f5ebe1] transition-colors" data-testid="footer-link-call">Call 24/7</a>
          </div>
          <p>© 2026 Accident Case Win</p>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-[#a89f95]/40 max-w-3xl">
          Disclaimer: This website is for informational purposes only and does not constitute legal advice. Accessing this site or contacting us does not establish an attorney-client relationship. Prior results or case outcomes do not guarantee a similar result. Accident Case Win is a fictional law firm used solely for demonstration and illustrative purposes.
        </p>
      </div>
    </footer>
  );
}
