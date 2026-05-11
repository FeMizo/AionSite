"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, BookOpen, Clock, Search } from "lucide-react";
import { blogPosts } from "@/src/data/blog-posts";
import { initialCmsContent } from "@/src/cms/site-content";
import { Header } from "@/src/components/sections/Header";
import { Footer } from "@/src/components/sections/Footer";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import { Card } from "@/src/components/ui/Card";
import { Container } from "@/src/components/ui/Container";
import { BlogCardSkeleton } from "@/src/components/ui/Skeleton";
import { mapNavigationForInnerPage } from "@/src/lib/navigation";

const nav = mapNavigationForInnerPage(
  initialCmsContent.sections.header.data.navigation,
);
const headerData = { ...initialCmsContent.sections.header.data, navigation: nav };
const base = { ...initialCmsContent.base, navigation: nav };

export function BlogListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    
    const query = searchQuery.toLowerCase();
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.badgeText.toLowerCase().includes(query) ||
      post.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
      post.blocks.some(block => block.text.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Simulate loading delay for better UX during search
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Header base={base} data={headerData} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/14 blur-[130px]" />
        <div className="absolute right-1/4 top-1/2 -z-10 h-[250px] w-[350px] rounded-full bg-blue-600/10 blur-[100px]" />
        <Container className="text-center">
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-violet-300 shadow-[0_14px_28px_-20px_rgba(124,58,237,0.6)]">
            <BookOpen size={14} />
            Blog & Recursos
          </div>
          <h1 className="mx-auto max-w-5xl text-display font-display font-bold text-white">
            Conocimiento que impulsa tu negocio digital.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
            Estrategias, tendencias y consejos prácticos de diseño web, SEO y conversión
            para que tu marca destaque y genere más clientes.
          </p>
          
          {/* Search Bar */}
          <div className="mx-auto mt-12 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-slate-400 transition-colors focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Posts grid */}
      <section className="bg-slate-950 pb-28 pt-8">
        <Container>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-slate-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No se encontraron artículos</h3>
              <p className="text-slate-400">Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <p className="text-sm text-slate-400">
                  {filteredPosts.length} artículo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
                  {searchQuery && ` para "${searchQuery}"`}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                  // Show skeletons during loading
                  Array.from({ length: 6 }).map((_, i) => (
                    <BlogCardSkeleton
                      key={`skeleton-${i}`}
                      className={`animate-reveal ${["", "anim-delay-75", "anim-delay-150", "anim-delay-225"][i] ?? ""}`}
                    />
                  ))
                ) : (
                  // Show actual posts when loaded
                  filteredPosts.map((post, i) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className={`group block animate-reveal transition-transform duration-150 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 active:scale-[0.97] ${["", "anim-delay-75", "anim-delay-150", "anim-delay-225"][i] ?? ""}`}
                    >
                      <Card className="flex h-full flex-col overflow-hidden p-0">
                        <div className="relative h-80 w-full overflow-hidden">
                          <Image
                            src={post.image ?? "/logo-aionsite.png"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />
                        </div>
                        <div className="flex flex-1 flex-col gap-4 p-6">
                          <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
                            <BookOpen size={11} />
                            {post.badgeText}
                          </div>
                          <div className="flex-1">
                            <h2 className="mb-3 font-display text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-blue-300">
                              {post.title}
                            </h2>
                            <p className="text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} />
                              {post.readTime}
                            </span>
                            <span className="flex items-center gap-1 text-blue-400 transition-colors duration-200 group-hover:text-blue-300">
                              Leer artículo
                              <ArrowRight size={12} className="transition-transform duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
            </>
          )}
        </Container>
      </section>

      <Footer base={base} data={initialCmsContent.sections.footer.data} />
      <WhatsAppFloatingButton data={initialCmsContent.sections.whatsappFloatingButton.data} />
    </>
  );
}
