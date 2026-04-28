import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Studio palette — deep charcoal base + Aarith magenta accent
        ink: {
          DEFAULT: "#0A0A0B",
          50: "#F7F7F8",
          100: "#E9E9EC",
          200: "#C9C9CF",
          300: "#9C9CA5",
          400: "#6E6E78",
          500: "#494951",
          600: "#2C2C32",
          700: "#1A1A1E",
          800: "#121214",
          900: "#0A0A0B",
          950: "#050506"
        },
        // Single-color accent: magenta drawn from the heart of the logo gradient
        accent: {
          DEFAULT: "#FF2D87",
          50:  "#FFE7F1",
          100: "#FFCFE2",
          200: "#FFA1C7",
          300: "#FF73AB",
          400: "#FF4592",
          500: "#FF2D87",
          600: "#E61570",
          700: "#BE0F5A",
          800: "#870A40",
          900: "#520626"
        },
        // Brand stops — orange ▸ pink ▸ purple ▸ indigo
        brand: {
          orange: "#FF6B3D",
          pink:   "#FF2D87",
          violet: "#A93BD9",
          indigo: "#3B5BDB"
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"]
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.03em"
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        // Aarith brand gradient — orange → pink → violet → indigo
        "brand-gradient":
          "linear-gradient(135deg, #FF6B3D 0%, #FF2D87 35%, #A93BD9 65%, #3B5BDB 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(255,107,61,0.15) 0%, rgba(255,45,135,0.18) 35%, rgba(169,59,217,0.16) 65%, rgba(59,91,219,0.14) 100%)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 40s linear infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
