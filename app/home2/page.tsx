import type { Metadata } from "next";
import { Hero2 } from "@/src/components/sections/Hero2";
import { HeaderHome2 } from "@/src/components/sections/HeaderHome2";
import { initialCmsContent } from "@/src/cms/site-content";
import { ContactHome2 } from "@/src/components/sections/ContactHome2";
import { PricingHome2 } from "@/src/components/sections/PricingHome2";
import { ProcessHome2 } from "@/src/components/sections/ProcessHome2";
import { ServicesApproach } from "@/src/components/sections/ServicesApproach";
import { ProjectsHome2 } from "@/src/components/sections/ProjectsHome2";
import { CtaFooterHome2 } from "@/src/components/sections/CtaFooterHome2";
import { InnovationVisionHome2 } from "@/src/components/sections/InnovationVisionHome2";

export const metadata: Metadata = {
  title: "AionSite | Home 2",
  description: initialCmsContent.base.description,
};

export default function Home2Page() {
  const { base, sections } = initialCmsContent;
  return (
    <>
      <HeaderHome2 base={base} data={sections.header.data} />
      <Hero2 data={sections.hero.data} headerData={sections.header.data} />
      <ServicesApproach data={sections.services.data} />
      <InnovationVisionHome2 content={sections.sideImageContent.data} process={sections.process.data} />
      <ProcessHome2 data={sections.process.data} />
      <ProjectsHome2 data={sections.portfolio.data} />
      <PricingHome2 />
      <ContactHome2 />
      <CtaFooterHome2 base={base} cta={sections.finalCTA.data} footer={sections.footer.data} process={sections.process.data} />
    </>
  );
}
