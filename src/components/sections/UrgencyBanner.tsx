import { Container } from "@/src/components/ui/Container";
import { LinkButton } from "@/src/components/ui/LinkButton";
import type { UrgencyBannerSectionData } from "@/src/cms/types";

export function UrgencyBanner({
  data,
}: {
  data: UrgencyBannerSectionData;
}) {
  return (
    <section className="bg-gradient-to-r from-blue-400 to-blue-600 py-8">
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
            <LinkButton
              href={data.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              {data.buttonText}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
