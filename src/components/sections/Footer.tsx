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
