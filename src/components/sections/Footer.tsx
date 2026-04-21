import Image from "next/image";
import Link from "next/link";
import type { CmsBase, FooterSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { isInternalHref } from "@/src/lib/routing";

export function Footer({
  base,
  data,
}: {
  base: CmsBase;
  data: FooterSectionData;
}) {
  return (
    <footer className="border-t border-white/5 bg-slate-950 py-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-2">
              <Image
                src={base.logoLight}
                alt={data.name}
                width={160}
                height={40}
                className="h-10 w-auto transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <p className="max-w-sm leading-relaxed text-slate-400">{data.description}</p>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Enlaces</h4>
            <ul className="space-y-4">
              {data.navigation.map((item) => (
                <li key={item.name}>
                  {isInternalHref(item.href) ? (
                    <Link
                      href={item.href}
                      className="text-slate-400 transition-colors hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-slate-400 transition-colors hover:text-white"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Contacto</h4>
            <ul className="space-y-4">
              <li className="text-slate-400">{data.email}</li>
              <li>
                <a
                  href={data.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 transition-colors hover:text-blue-300 hover:underline"
                >
                  WhatsApp directo
                </a>
              </li>
            </ul>
            <h4 className="mb-4 mt-8 font-bold text-white">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/aionsite/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/aionsite.webs/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {data.name}. Todos los derechos reservados.</p>
          <p className="mt-2">Diseñado con pasión por AionSite.</p>
        </div>
      </Container>
    </footer>
  );
}
