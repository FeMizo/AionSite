import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";
import type { UrgencyBannerSectionData } from "@/src/cms/types";

export function UrgencyBanner({
  data,
}: {
  data: UrgencyBannerSectionData;
}) {
  return (
    <section className="bg-gradient-to-r from-red-600 to-orange-600 py-8">
      <Container>
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">
            {data.title}
          </h2>
          <p className="mb-6 text-white/90">
            {data.subtitle}
          </p>
          <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
            ⏰ {data.deadline}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={data.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-red-600 transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {data.buttonText}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}