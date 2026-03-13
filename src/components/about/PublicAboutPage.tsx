"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Gauge,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MessageCircleMore,
  PenTool,
  ShoppingBag,
} from "lucide-react";
import {
  loadAboutContentFromBrowser,
  loadAboutContentFromFile,
  saveAboutContentToBrowser,
} from "@/src/about/browser-storage";
import type { AboutContent } from "@/src/about/types";
import { initialCmsContent } from "@/src/cms/site-content";
import { Footer } from "@/src/components/sections/Footer";
import { Header } from "@/src/components/sections/Header";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import { Card } from "@/src/components/ui/Card";
import { ContactPanel } from "@/src/components/ui/ContactPanel";
import { Container } from "@/src/components/ui/Container";
import { HighlightGrid } from "@/src/components/ui/HighlightGrid";
import { LinkButton } from "@/src/components/ui/LinkButton";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { TagGroup } from "@/src/components/ui/TagGroup";
import { Timeline } from "@/src/components/ui/Timeline";
import { mapNavigationForInnerPage } from "@/src/lib/navigation";

const navigation = mapNavigationForInnerPage(
  initialCmsContent.sections.header.data.navigation,
);

const base = {
  ...initialCmsContent.base,
  navigation,
};

const headerData = {
  ...initialCmsContent.sections.header.data,
  navigation,
};

const footerData = {
  ...initialCmsContent.sections.footer.data,
  navigation,
};

const valueIcons = [
  <Globe size={22} key="frontend" />,
  <ShoppingBag size={22} key="commerce" />,
  <Gauge size={22} key="optimization" />,
];

const differentiatorIcons = [
  <PenTool size={22} key="design" />,
  <BriefcaseBusiness size={22} key="delivery" />,
  <Gauge size={22} key="performance" />,
  <Globe size={22} key="business" />,
];

export function PublicAboutPage({
  initialContent,
}: {
  initialContent: AboutContent;
}) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    let isCancelled = false;
    setContent(loadAboutContentFromBrowser());

    (async () => {
      const fileContent = await loadAboutContentFromFile();
      if (!fileContent || isCancelled) {
        return;
      }

      saveAboutContentToBrowser(fileContent);
      setContent(fileContent);
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      <Header base={base} data={headerData} />

      <main className="min-h-screen">
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
          <div className="absolute left-1/2 top-0 -z-10 h-160 w-200 -translate-x-1/2 rounded-full bg-blue-600/18 blur-[140px]" />
          <div className="absolute right-0 top-36 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />

          <Container>
            <div className="grid gap-12 xl:grid-cols-[minmax(0,1.25fr)_420px] xl:items-end">
              <div>
                <div className="inline-flex items-center rounded-full border border-blue-300/25 bg-white/5 px-4 py-2 text-sm font-medium text-blue-300 shadow-[0_14px_28px_-20px_rgba(59,130,246,0.7)]">
                  {content.hero.eyebrow}
                </div>

                <h1 className="mt-8 max-w-5xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                  {content.hero.title}
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  {content.hero.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    {content.hero.role}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    {content.hero.location}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    {content.hero.availability}
                  </span>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <LinkButton
                    href={initialCmsContent.base.whatsappLink}
                    size="lg"
                    className="gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircleMore size={18} />
                    Talk on WhatsApp
                  </LinkButton>
                  <LinkButton
                    href={content.contact.linkedIn}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View LinkedIn
                  </LinkButton>
                </div>
              </div>

              <Card className="rounded-[2rem] p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                  Snapshot
                </p>
                <div className="mt-6 grid gap-4">
                  {content.hero.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-5"
                    >
                      <p className="text-2xl font-semibold text-white">{item.value}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div>
                <SectionHeading
                  title={content.intro.title}
                  subtitle={content.intro.paragraphs[0]}
                  centered={false}
                  className="mb-8"
                />
                <p className="max-w-3xl text-lg leading-relaxed text-slate-400">
                  {content.intro.paragraphs[1]}
                </p>
              </div>

              <div className="grid gap-5">
                {content.intro.principles.map((principle) => (
                  <Card key={principle.title} className="p-6">
                    <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-400">
                      {principle.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-slate-900/30 py-24">
          <Container>
            <SectionHeading
              title="Where I add the most value"
              subtitle="The strongest overlap in the CV is frontend delivery, CMS execution, and optimization work that supports growth."
            />

            <HighlightGrid
              items={content.valueBlocks.map((item, index) => ({
                ...item,
                icon: valueIcons[index],
              }))}
              columns={3}
            />
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <SectionHeading
              title="Selected experience"
              subtitle="A condensed version of the CV focused on the roles and responsibilities that matter most for a web-facing About page."
            />

            <Timeline items={content.experience} />
          </Container>
        </section>

        <section className="bg-slate-900/30 py-24">
          <Container>
            <SectionHeading
              title="Skills, stack, and delivery tools"
              subtitle="Grouped for web readability instead of repeating the CV format line by line."
            />

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_360px]">
              <div className="grid gap-8">
                {content.stack.map((group) => (
                  <TagGroup
                    key={group.title}
                    title={group.title}
                    description={group.description}
                    items={group.items}
                  />
                ))}
              </div>

              <div className="grid gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 text-white">
                    <GraduationCap size={20} className="text-blue-300" />
                    <h3 className="text-lg font-semibold">Education</h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-slate-400">
                    {content.education.summary}
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 text-white">
                    <Languages size={20} className="text-blue-300" />
                    <h3 className="text-lg font-semibold">Languages</h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    {content.education.languages.map((language) => (
                      <div
                        key={language}
                        className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-300"
                      >
                        {language}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <SectionHeading
              title="Differentiators"
              subtitle="The CV points to a profile that connects visual judgment, implementation discipline, and business-oriented web delivery."
            />

            <HighlightGrid
              items={content.differentiators.map((item, index) => ({
                ...item,
                icon: differentiatorIcons[index],
              }))}
              columns={4}
            />
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            <ContactPanel
              title={content.contact.title}
              description={content.contact.description}
              note={content.contact.note}
              actions={[
                {
                  label: "Start on WhatsApp",
                  href: initialCmsContent.base.whatsappLink,
                  icon: <MessageCircleMore size={18} />,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                {
                  label: "Send an email",
                  href: `mailto:${content.contact.email}`,
                  variant: "outline",
                  icon: <Mail size={18} />,
                },
              ]}
            />
          </Container>
        </section>
      </main>

      <Footer base={base} data={footerData} />
      <WhatsAppFloatingButton
        data={initialCmsContent.sections.whatsappFloatingButton.data}
      />
    </>
  );
}
