# Studio Website

Premium app studio site — **Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion**.

Single-page layout with smooth anchor scrolling. Dark by default with a light-mode toggle, custom cursor on desktop, accessible (WCAG AA), and SEO-ready.

---

## Quick start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

For production:

```bash
npm run build
npm start
```

---

## Project structure

```
app/
  layout.tsx                 Root layout, fonts, theme provider, metadata
  page.tsx                   Single-page composition
  globals.css                Tailwind layers + design tokens + animations
  api/placeholder/[...]/     SVG placeholder image route
components/
  Navbar.tsx                 Sticky pill nav with mobile drawer + theme toggle
  Hero.tsx                   Stagger word reveal + animated gradient mesh
  LogoCloud.tsx              Marquee of client wordmarks
  Capabilities.tsx           6 capability cards
  CaseStudies.tsx            Magazine-style asymmetric grid (2x2 with span)
  Process.tsx                5-stage horizontal timeline
  Team.tsx                   8 team cards with hover bio + socials
  Stats.tsx                  Animated counters on viewport-enter
  Testimonials.tsx           3 quote cards
  TechTools.tsx              Tech grid with monochrome → brand-color hover
  Contact.tsx                Split layout: copy + form + map placeholder
  Footer.tsx                 4 columns + oversized wordmark
  ThemeProvider.tsx          next-themes wrapper (dark default)
  ThemeToggle.tsx            Sun/moon toggle
  CustomCursor.tsx           Desktop-only premium cursor (dot + trailing ring)
  Reveal.tsx                 Reusable scroll-fade-up wrapper (Framer Motion)
  Container.tsx              Max-width wrapper + SectionLabel helper
data/
  site-config.ts             ⭐ Centralized copy/placeholders — edit this file
lib/
  utils.ts                   `cn()` helper
```

## Replacing placeholders

All strings the user is expected to swap live in **`data/site-config.ts`** and are tagged with `[PLACEHOLDER]` in comments. Highlights:

- `COMPANY_NAME`, `TAGLINE`
- `HERO.headline / subheadline / badge`
- `TRUSTED_BY.logos` — replace string list with imported SVG components for real brands
- `CASE_STUDIES[]` — `name`, `client`, `vertical`, `outcome`, `href`, optional `span` (Tailwind grid span like `lg:col-span-7`)
- `TEAM_MEMBERS[]` — `name`, `role`, `bio`, `linkedin`, `twitter`. Profile photos pull from `/api/placeholder/600/600`; swap to real `<Image>` when ready.
- `STATS[]` — `value`, `prefix`, `suffix`, optional `decimals`
- `TESTIMONIALS[]`, `CONTACT.email/phone/address`

## Design tokens

Defined in `tailwind.config.ts`:

- **Background:** `ink-950` (near-black `#0A0A0B`)
- **Foreground:** `ink-50` (off-white)
- **Accent:** `accent-500` electric blue (`#3D7BFF`) — used sparingly
- **Fonts:** Geist Sans (primary) + Geist Mono (eyebrows / micro-copy)

Light mode automatically inverts via `next-themes`. Test it via the toggle in the navbar.

## Real client logos

Drop SVG files into `/public/logos/` and replace the string array in `TRUSTED_BY.logos` with `Image` imports. The marquee component in `LogoCloud.tsx` will automatically loop and mask-fade the edges.

## Form handler

`Contact.tsx` short-circuits to a "thanks" state on submit. Wire `onSubmit` to a real handler — Resend, HubSpot, or a custom `/api/contact` route.

## Accessibility

- `prefers-reduced-motion` honored everywhere (`Reveal`, `CustomCursor`, hero)
- Focus styles preserved (`focus-visible:ring`)
- Form labels are associated; required fields announced
- Color contrast meets WCAG AA on the dark theme

## Performance notes

- All animations are GPU-friendly (transform/opacity only)
- `<Image>` is opted-out for placeholder routes; swap to `next/image` for real assets
- `Cache-Control: immutable` on the placeholder SVGs

## Deploying

Drop-in deploy to Vercel:

```bash
vercel
```

No environment variables required to ship the marketing site.
