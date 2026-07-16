import { initialCmsContent } from "@/src/cms/site-content";
import { Footer } from "@/src/components/sections/Footer";
import { mapNavigationForInnerPage } from "@/src/lib/navigation";

const navigation = mapNavigationForInnerPage(
  initialCmsContent.sections.footer.data.navigation,
);

const base = {
  ...initialCmsContent.base,
  navigation,
};

const data = {
  ...initialCmsContent.sections.footer.data,
  navigation,
};

export function SiteFooter() {
  if (!initialCmsContent.sections.footer.enabled) {
    return null;
  }

  return <Footer base={base} data={data} />;
}
