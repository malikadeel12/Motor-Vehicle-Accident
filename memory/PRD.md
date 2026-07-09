# PRD — Motor Vehicle Accidents Law Firm Landing Page

## Original Problem Statement
Create a website for "Motor Vehicle Accidents" — a personal injury law firm helping people rebuild their lives after devastating crashes. Dark, cinematic, intimate mood ("premium theater watching a film about justice"). Visitor must feel RELIEF, HOPE, EMPOWERED within 3 seconds. Boutique NYC creative agency feel, NOT AI slop. Warm charcoal-with-burgundy base, brake-light red accents, amber gold highlights, warm white text. Huge line-breaking headlines, massive gold settlement numbers, asymmetric layouts, cinematic scroll animations, one dominant red CTA, phone always visible, no popups.

## User Choices
- Frontend-only (form shows confirmation, no data stored)
- Fictional firm: Meridian & Rowe Trial Lawyers, phone (555) 123-4567
- Single-page cinematic scroll experience

## Architecture
- React 19 + Tailwind + framer-motion (scroll reveals) + lucide-react icons
- Fonts: Oswald (display) + Outfit (body) via Google Fonts
- Components in `/app/frontend/src/components/landing/`: Nav, Hero, HandleEverything, Results, Journey, Testimonials, CaseForm, FinalPush, Footer
- No backend usage (default FastAPI template untouched)

## Implemented (June 2026)
- Sticky glassmorphism nav: logo, gold phone, red CTA (scrolls to form)
- Cinematic hero: highway tail-lights image, "You Focus on Healing / We Focus on Winning." with "Winning." in red, red glowing CTA, gold 24/7 phone, star + trust signals
- "We Handle Everything" — asymmetric chaos vs. calm narrative
- "Real Results, Real People" — alternating massive gold numbers ($5.2M/$1.2M/$3.8M) with human stories + disclaimer
- "What Actually Happens" — 3-step glowing timeline (The Call → The Fight → The Win)
- "You're Not Alone" — asymmetric staggered testimonials over dark silhouette backdrop
- Final push "Don't Let Them Run Out the Clock." + frontend-only case review form with warm confirmation state
- Dignified footer: large gold phone, minimal links, small attorney-advertising disclaimer
- Grain texture overlays, warm color CSS variables, data-testids on all interactive elements

## Testing
- iteration_1.json: frontend 100% pass (hero, nav, scroll CTAs, all sections, form submit + validation, mobile 390px, no console errors)
- iteration_2.json: /estimate calculator 100% pass (all 6 questions, multi-select gating, contact gate, result ranges, banner/footer navigation, mobile, regression clean)

## Later Additions
- De-AI polish pass: Instrument Serif accents, scattered-paper chaos cards, editorial testimonials, ghost numbers
- AccidentTypes section (8 crash types, editorial type-list) + Damages section (6 recoverables, asymmetric layout)
- SEO meta tags, OG/Twitter cards, LegalService JSON-LD, MR monogram favicon set
- /estimate case-value calculator — ADDED then fully REMOVED at user's request (banner, page, route, footer link all deleted)

## Backlog / Next Tasks
- P1: Persist form leads to backend + simple admin view (if user upgrades from frontend-only)
- P1: Real firm name/phone/address swap-in
- P2: SEO meta tags / OpenGraph image, favicon
- P2: Video testimonials, sticky mobile call bar
