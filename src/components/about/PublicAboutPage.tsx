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
import {
  getAboutUiCopy,
  getLocalizedAboutContent,
  type AboutLanguage,
} from "@/src/about/localized-content";
import type { AboutContent } from "@/src/about/types";
import { initialCmsContent } from "@/src/cms/site-content";
import { Footer } from "@/src/components/sections/Footer";
import { Header } from "@/src/components/sections/Header";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import { Button } from "@/src/components/ui/Button";
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

const ABOUT_LANGUAGE_STORAGE_KEY = "aionsite.about.language";

export function PublicAboutPage({
  initialContent,
}: {
  initialContent: AboutContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [language, setLanguage] = useState<AboutLanguage>("es");

  useEffect(() => {
    let isCancelled = false;
    setContent(loadAboutContentFromBrowser());

    const storedLanguage = window.localStorage.getItem(ABOUT_LANGUAGE_STORAGE_KEY);
    if (storedLanguage === "en" || storedLanguage === "es") {
      setLanguage(storedLanguage);
    }

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

  const localizedContent = getLocalizedAboutContent(content, language);
  const uiCopy = getAboutUiCopy(language);

  function handleLanguageChange(nextLanguage: AboutLanguage) {
    setLanguage(nextLanguage);
    window.localStorage.setItem(ABOUT_LANGUAGE_STORAGE_KEY, nextLanguage);
  }

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
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    {uiCopy.switchLabel}
                  </span>
                  <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                    <Button
                      type="button"
                      size="sm"
                      variant={language === "en" ? "primary" : "ghost"}
                      className="min-w-14 rounded-full px-4"
                      onClick={() => handleLanguageChange("en")}
                      aria-pressed={language === "en"}
                    >
                      EN
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant={language === "es" ? "primary" : "ghost"}
                      className="min-w-14 rounded-full px-4"
                      onClick={() => handleLanguageChange("es")}
                      aria-pressed={language === "es"}
                    >
                      ES
                    </Button>
                  </div>
                </div>

                <div className="inline-flex items-center rounded-full border border-blue-300/25 bg-white/5 px-4 py-2 text-sm font-medium text-blue-300 shadow-[0_14px_28px_-20px_rgba(59,130,246,0.7)]">
                  {localizedContent.hero.eyebrow}
                </div>

                <h1 className="mt-8 max-w-5xl text-display font-display font-bold text-white">
                  {localizedContent.hero.title}
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  {localizedContent.hero.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    {localizedContent.hero.role}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    {localizedContent.hero.location}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    {localizedContent.hero.availability}
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
                    {uiCopy.talkOnWhatsApp}
                  </LinkButton>
                  <LinkButton
                    href={localizedContent.contact.linkedIn}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {uiCopy.viewLinkedIn}
                  </LinkButton>
                </div>
              </div>

              <Card className="rounded-[2rem] p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                  {uiCopy.snapshot}
                </p>
                <div className="mt-6 grid gap-4">
                  {localizedContent.hero.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-5"
                    >
                      <p className="font-display text-2xl font-semibold tabular-nums text-white">{item.value}</p>
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
                  title={localizedContent.intro.title}
                  subtitle={localizedContent.intro.paragraphs[0]}
                  centered={false}
                  className="mb-8"
                />
                <p className="max-w-3xl text-lg leading-relaxed text-slate-400">
                  {localizedContent.intro.paragraphs[1]}
                </p>
              </div>

              <div className="grid gap-5">
                {localizedContent.intro.principles.map((principle) => (
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
            <SectionHeading title={uiCopy.valueTitle} subtitle={uiCopy.valueSubtitle} />

            <HighlightGrid
              items={localizedContent.valueBlocks.map((item, index) => ({
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
              title={uiCopy.experienceTitle}
              subtitle={uiCopy.experienceSubtitle}
            />

            <Timeline items={localizedContent.experience} />
          </Container>
        </section>

        <section className="bg-slate-900/30 py-24">
          <Container>
            <SectionHeading title={uiCopy.stackTitle} subtitle={uiCopy.stackSubtitle} />

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_360px]">
              <div className="grid gap-8">
                {localizedContent.stack.map((group) => (
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
                    <h3 className="text-lg font-semibold">{uiCopy.education}</h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-slate-400">
                    {localizedContent.education.summary}
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 text-white">
                    <Languages size={20} className="text-blue-300" />
                    <h3 className="text-lg font-semibold">{uiCopy.languages}</h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    {localizedContent.education.languages.map((language) => (
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
              title={uiCopy.differentiatorsTitle}
              subtitle={uiCopy.differentiatorsSubtitle}
            />

            <HighlightGrid
              items={localizedContent.differentiators.map((item, index) => ({
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
              title={localizedContent.contact.title}
              description={localizedContent.contact.description}
              note={localizedContent.contact.note}
              actions={[
                {
                  label: uiCopy.startOnWhatsApp,
                  href: initialCmsContent.base.whatsappLink,
                  icon: <MessageCircleMore size={18} />,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                {
                  label: uiCopy.sendEmail,
                  href: `mailto:${localizedContent.contact.email}`,
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
