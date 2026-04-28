import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "@/src/data/blog-posts";
import { initialCmsContent } from "@/src/cms/site-content";
import { Header } from "@/src/components/sections/Header";
import { Footer } from "@/src/components/sections/Footer";
import { WhatsAppFloatingButton } from "@/src/components/sections/WhatsAppFloatingButton";
import { Card } from "@/src/components/ui/Card";
import { Container } from "@/src/components/ui/Container";
import { mapNavigationForInnerPage } from "@/src/lib/navigation";

const nav = mapNavigationForInnerPage(
  initialCmsContent.sections.header.data.navigation,
);
const headerData = { ...initialCmsContent.sections.header.data, navigation: nav };
const base = { ...initialCmsContent.base, navigation: nav };

export function BlogListPage() {
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
        </Container>
      </section>

      {/* Posts grid */}
      <section className="bg-slate-950 pb-28 pt-8">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
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
            ))}
          </div>
        </Container>
      </section>

      <Footer base={base} data={initialCmsContent.sections.footer.data} />
      <WhatsAppFloatingButton data={initialCmsContent.sections.whatsappFloatingButton.data} />
    </>
  );
}
