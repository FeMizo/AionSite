import type { Metadata } from "next";
import { notFound } from "next/navigation";
import examples from "@/examples/aionsite/catalog.json";

export const dynamicParams = false;

export function generateStaticParams() {
  return examples.proposals.map((item) => ({ proposal: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ proposal: string }> }): Promise<Metadata> {
  const { proposal } = await params;
  const item = examples.proposals.find((entry) => entry.id === proposal);
  return { title: item ? `${item.title} | Estilos | AionSite` : "Ejemplo no encontrado", robots: { index: false, follow: false } };
}

export default async function StyleProposalPage({ params }: { params: Promise<{ proposal: string }> }) {
  const { proposal } = await params;
  const item = examples.proposals.find((entry) => entry.id === proposal);
  if (!item) notFound();
  return <main><iframe src={`/style-examples/${item.id}/proposal.html`} title={`Propuesta ${item.number}: ${item.title}`} style={{ display: "block", width: "100%", height: "100dvh", border: 0 }} /></main>;
}
