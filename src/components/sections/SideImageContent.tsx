import { ExternalLink } from "lucide-react";
import type { SideImageContentSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href);
}

export function SideImageContent({
  data,
}: {
  data: SideImageContentSectionData;
}) {
  const openExternally = isExternalLink(data.buttonLink);
  const imageOrderClass = data.reverse ? "lg:order-2" : "lg:order-1";
  const contentOrderClass = data.reverse ? "lg:order-1" : "lg:order-2";

  return (
    <section className="bg-slate-950 py-24">
      <Container>
        <div className="rounded-[2.5rem] border border-white/8 bg-slate-900/60 p-6 backdrop-blur md:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div
              className={`overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 ${imageOrderClass}`}
            >
              {data.image ? (
                <img
                  src={data.image}
                  alt={data.title}
                  className="h-full min-h-[280px] w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center px-6 text-center text-sm text-slate-400">
                  Sin imagen configurada
                </div>
              )}
            </div>

            <div className={`space-y-5 ${contentOrderClass}`}>
              <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                {data.title}
              </h2>
              <p className="text-base leading-7 text-slate-300 md:text-lg">
                {data.description}
              </p>

              {data.buttonText && data.buttonLink ? (
                <a
                  href={data.buttonLink}
                  target={openExternally ? "_blank" : undefined}
                  rel={openExternally ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/45"
                >
                  {data.buttonText}
                  {openExternally ? <ExternalLink size={14} /> : null}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
