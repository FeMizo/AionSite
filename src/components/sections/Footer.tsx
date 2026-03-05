import { siteData } from "@/src/data/site";
import { Container } from "@/src/components/ui/Container";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-950 py-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                A
              </div>
              <span className="text-xl font-bold text-white">{siteData.name}</span>
            </a>
            <p className="max-w-sm text-slate-400 leading-relaxed">
              {siteData.description}
            </p>
          </div>
          
          <div>
            <h4 className="mb-6 font-bold text-white">Enlaces</h4>
            <ul className="space-y-4">
              {siteData.navigation.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Contacto</h4>
            <ul className="space-y-4">
              <li className="text-slate-400">{siteData.email}</li>
              <li>
                <a
                  href={siteData.whatsappLink}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  WhatsApp Directo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {siteData.name}. Todos los derechos reservados.</p>
          <p className="mt-2">Diseñado con pasión por AionSite.</p>
        </div>
      </Container>
    </footer>
  );
};
