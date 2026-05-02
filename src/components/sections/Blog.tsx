"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { BlogSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { Card } from "@/src/components/ui/Card";
import { ContactForm } from "@/src/components/ui/ContactForm";
import { TableOfContents } from "@/src/components/blog/TableOfContents";
import { ArticleBlockRenderer } from "@/src/components/blog/ArticleBlockRenderer";

export function Blog({ data }: { data: BlogSectionData }) {
  return (
    <>
      {/* Hero */}
      <section id="blog" className="relative overflow-hidden bg-slate-950 pb-20 pt-28 md:pb-28 md:pt-40">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/14 blur-[130px]" />
        <div className="absolute left-1/4 top-1/3 -z-10 h-[300px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
        <Container className="text-center">
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-violet-300 shadow-[0_14px_28px_-20px_rgba(124,58,237,0.6)]">
            <BookOpen size={14} />
            {data.hero.badgeText}
          </div>
          <h1 className="mx-auto max-w-4xl text-display font-display font-bold text-white">
            {data.hero.title}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {data.hero.subtitle}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
            >
              Ver todos los artículos
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          </div>
        </Container>
      </section>

      {/* 3-column content */}
      <section className="bg-slate-950 pb-28 pt-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[320px_1fr_320px] lg:items-start lg:gap-14">

            {/* Left: Table of contents */}
            <aside className="hidden lg:block">
              <TableOfContents headings={data.article.headings} />
            </aside>

            {/* Center: Article */}
            <article className="min-w-0">
              <ArticleBlockRenderer blocks={data.article.blocks} />
            </article>

            {/* Right: Contact form */}
            <aside>
              <div className="sticky top-24">
                <Card className="p-6">
                  <h3 className="mb-1 font-display text-lg font-bold text-white">
                    {data.form.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    {data.form.subtitle}
                  </p>
                  
                  <ContactForm 
                    showPhone={false}
                  />
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
