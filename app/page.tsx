import { Header } from "@/src/components/sections/Header";
import { Hero } from "@/src/components/sections/Hero";
import { Services } from "@/src/components/sections/Services";
import { Stats } from "@/src/components/sections/Stats";
import { Portfolio } from "@/src/components/sections/Portfolio";
import { Process } from "@/src/components/sections/Process";
import { Pricing } from "@/src/components/sections/Pricing";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { FAQ } from "@/src/components/sections/FAQ";
import { FinalCTA } from "@/src/components/sections/FinalCTA";
import { Footer } from "@/src/components/sections/Footer";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Stats />
      <Portfolio />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppFloatingButton />
    </main>
  );
}
