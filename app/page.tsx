import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Capabilities } from "@/components/Capabilities";
import { CaseStudies } from "@/components/CaseStudies";
import { Process } from "@/components/Process";
import { Stats } from "@/components/Stats";
import { TechTools } from "@/components/TechTools";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Capabilities />
      <CaseStudies />
      <Process />
      <Stats />
      <TechTools />
      <Contact />
      <Footer />
    </main>
  );
}
