/**
 * site-config.ts
 * --------------------------------------------------------------------------
 * Single source of truth for all copy and content on the site.
 *
 * IMPORTANT — fields tagged [FILL] must be filled in with real values
 * before publishing. They are required for Google Play Console
 * organisation account verification.
 * --------------------------------------------------------------------------
 */

// Brand name shown in nav, hero, footer wordmark, metadata
export const COMPANY_NAME = "Aarith";

// Legal entity name — used in the footer copyright line and on legal pages
export const LEGAL_NAME = "Imnemosyne Technologies Private Limited";

// One-line studio tagline — shown under the wordmark in the footer
export const TAGLINE = "An India-rooted app studio building for the world from Bengaluru.";

// Hero block — headline + subhead + CTAs
export const HERO = {
  badge: "Bengaluru, India · Building for the world",
  // Use a soft line break (\n) where you want the headline to wrap
  headline: "Software studio out of Bengaluru,\nbuilt for India and beyond.",
  subheadline:
    "Aarith is the consumer-app practice of Imnemosyne Technologies Private Limited. We design and ship mobile and web products — starting with Vriddhi, our multi-lingual learning app for students across India.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See our work", href: "#work" }
};

// What We Do — capability cards.
// Phrased as services we offer, not outcomes we claim.
export const CAPABILITIES = [
  {
    title: "EdTech for Bharat",
    summary:
      "Multi-lingual learning experiences designed for students in tier-2 and tier-3 India — practical, vernacular, and built for low-bandwidth conditions.",
    points: ["Vernacular UX", "Adaptive content", "Offline-first", "Affordable on entry-level Android"]
  },
  {
    title: "FinTech & Payments",
    summary:
      "Consumer FinTech experiences — UPI flows, wallets, KYC journeys and transaction surfaces — designed with Indian regulation and infrastructure in mind.",
    points: ["UPI flows", "KYC journeys", "Audit-ready logs", "RBI-aware architectures"]
  },
  {
    title: "Native iOS & Android",
    summary:
      "Apps that feel native because they are. Swift and Kotlin, modern lifecycle handling, and an obsession with the things you only notice when they're missing.",
    points: ["SwiftUI", "Jetpack Compose", "Offline-first", "Play Store + App Store"]
  },
  {
    title: "Cross-platform",
    summary:
      "When velocity matters, we build with Flutter or React Native — without giving up the polish of a native build.",
    points: ["Flutter", "React Native", "Shared design systems", "Native bridges"]
  },
  {
    title: "Backend, Cloud & AI",
    summary:
      "API platforms, cloud infrastructure, and AI features — the layer that makes great consumer apps actually work.",
    points: ["Node / Python", "AWS / GCP", "Vector + RAG", "ML pipelines"]
  },
  {
    title: "Design & Brand Systems",
    summary:
      "Identity, motion, and product design — built as a system, not a one-off — so the app, the website, and the store listing all sound like the same company.",
    points: ["Identity systems", "Motion language", "Product design", "Store assets"]
  }
];

// Selected work / case studies. Only real, shipped products.
//
// `image` may be a path under /public (e.g. "/work/vriddhi.png") or a full
// URL. If omitted, the card falls back to a generated placeholder.
export const CASE_STUDIES: {
  name: string;
  vertical: string;
  outcome: string;
  client: string;
  href: string;
  span: string;
  image?: string;
  imageAlt?: string;
  // "cover" (default) crops to fill the card.
  // "contain" centers the image on a brand backdrop — use for logos / icons.
  imageFit?: "cover" | "contain";
}[] = [
  {
    name: "Vriddhi — Practical skills, in your language",
    vertical: "EdTech",
    outcome:
      "A multi-lingual learning app teaching practical skills — Product Management, Python, SQL, Data Science, Marketing and Web Design — in English, Hindi, Marathi, Telugu and Bengali, for students across tier-2 and tier-3 India.",
    client: "Aarith / Imnemosyne",
    href: "https://play.google.com/store/apps/details?id=co.diy18.xwbvl",
    span: "lg:col-span-7",
    image: "/vriddhi.png",
    imageAlt: "Vriddhi app — multi-lingual learning on Android"
  },
  {
    name: "EMI Calculator & Loan Tracker",
    vertical: "FinTech · Personal Finance",
    outcome:
      "A clean Android utility that lets users compute EMIs across tenures and rates, and keep an honest, on-device record of the loans they're servicing — built for Indian borrowers.",
    client: "Aarith / Imnemosyne",
    href: "https://play.google.com/store/apps/details?id=emi_trackerapp.vriddhi",
    span: "lg:col-span-5",
    image: "/emi-loan-tracker.png",
    imageAlt: "EMI Calculator and Loan Tracker app on Android",
    imageFit: "contain"
  },
  {
    name: "Harsh Kumar Sharma — Personal portfolio",
    vertical: "Web · Personal brand",
    outcome:
      "A bespoke personal-portfolio website designed and engineered for an individual founder — a single, fast-loading page that captures who they are, what they've shipped, and how to reach them.",
    client: "Harsh Kumar Sharma",
    href: "https://harshkumarsharma.in/",
    span: "lg:col-span-12",
    image: "/harsh-portfolio.png",
    imageAlt: "Harsh Kumar Sharma — personal portfolio website"
  }
];

// Process — five-stage timeline (capability statements, not promises)
export const PROCESS = [
  {
    label: "Discover",
    body:
      "We sit with founders and product leaders to map the problem space, the regulatory terrain, and the unfair advantage we can build around."
  },
  {
    label: "Design",
    body:
      "Systems-thinking design: information architecture, motion language, and pixel-level craft — never decoration without a reason."
  },
  {
    label: "Develop",
    body:
      "Engineers build the product in tight loops, with weekly demos, observability from day one, and a bias toward shipping small."
  },
  {
    label: "Deploy",
    body:
      "Phased launches, safe rollouts, performance budgets, and an honest post-launch review — not a victory lap."
  },
  {
    label: "Scale",
    body:
      "Once you have product-market fit, we re-architect for the next order of magnitude — performance, reliability, and reach."
  }
];

// "About" facts strip — verifiable, conservative claims only.
// Replace with real numbers as the studio grows.
export const FACTS = [
  { value: "Bengaluru", label: "Studio in" },
  { value: "Maharashtra", label: "Registered office state" },
  { value: "5", label: "Indian languages in Vriddhi" },
  { value: "Pvt. Ltd.", label: "Registered company structure" }
];

// Tech stack we work with
export const TECH = [
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "Next.js",
  "Node.js",
  "Python",
  "AWS",
  "GCP",
  "Firebase",
  "PostgreSQL",
  "Kubernetes",
  "TensorFlow"
];

// ---------------------------------------------------------------------------
// CONTACT — these values are REQUIRED for Google Play organisation
// verification. Replace the [FILL] placeholders with real, verifiable values
// before submitting the developer-account upgrade.
// ---------------------------------------------------------------------------
export const CONTACT = {
  // Public business email (must be a working inbox you can verify from).
  email: "ecometsmb@gmail.com",
  // Public business phone in international format
  phone: "+91 9137579522",
  // Full registered office address as it appears on the Certificate of
  // Incorporation. Google may match this against MCA / D-U-N-S records.
  address:
    "Plot No. 17, Vrindavan Colony, Parsodi, Jawaharnagar Road, Thana Petrol Pump, Bhandara, Maharashtra - 441906, India"
};

// Legal / corporate identifiers used on the Privacy Policy, Terms and Footer.
// Required for Google Play organisation account verification.
export const LEGAL = {
  // Corporate Identification Number from MCA
  cin: "U63999MH2023PTC415388",
  // Date of incorporation as on Certificate of Incorporation
  incorporated: "13 December 2023",
  // D-U-N-S Number (used by Google Play for org verification)
  duns: "[FILL_DUNS_NUMBER]",
  // Grievance Officer — required under the DPDP Act 2023 / IT Rules 2021
  grievanceOfficer: {
    name: "Harsh Kumar Sharma",
    email: "hksrise@gmail.com"
  },
  // Date the policies were last updated (YYYY-MM-DD)
  policiesLastUpdated: "2026-04-28"
};

// Top nav anchors
export const NAV_LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" }
];

// Footer columns — only links that point to real destinations.
export const FOOTER_COLUMNS = [
  {
    title: "Studio",
    links: [
      { label: "Capabilities", href: "#capabilities" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
];

// Social links — leave only the platforms where Aarith has a real presence.
// Empty array is fine; the footer hides the row when empty.
export const SOCIAL_LINKS: { label: string; href: string }[] = [];
