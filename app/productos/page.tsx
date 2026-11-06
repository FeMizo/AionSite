import { permanentRedirect } from "next/navigation";
import { getSitePage } from "@/src/lib/site-pages";

export default function ProductsRedirect() {
  permanentRedirect(getSitePage('quote').path);
}
