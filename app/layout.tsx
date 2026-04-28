import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { COMPANY_NAME, TAGLINE } from "@/data/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${COMPANY_NAME} — App studio in Bengaluru, India`,
  description:
    "Aarith is the consumer-app practice of Imnemosyne Technologies Private Limited — an India-rooted studio in Bengaluru designing and shipping mobile and web products, including the Vriddhi multi-lingual learning app.",
  metadataBase: new URL("https://aarith.com"),
  openGraph: {
    title: `${COMPANY_NAME} — App studio in Bengaluru, India`,
    description: TAGLINE,
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} — App studio in Bengaluru, India`,
    description: TAGLINE
  },
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-ink-950 text-ink-50 font-sans antialiased selection:bg-accent/40">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
