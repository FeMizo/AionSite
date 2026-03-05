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
import { siteData } from "@/src/data/site";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      {siteData.header.show && <Header />}
      <main className="min-h-screen">
        {siteData.hero.show && <Hero />}
        {siteData.services.show && <Services />}
        {siteData.stats.show && <Stats />}
        {siteData.portfolio.show && <Portfolio />}
        {siteData.process.show && <Process />}
        {siteData.pricing.show && <Pricing />}
        {siteData.testimonials.show && <Testimonials />}
        {siteData.faq.show && <FAQ />}
        {siteData.finalCTA.show && <FinalCTA />}
      </main>
      {siteData.footer.show && <Footer />}
    </>
  );
}
