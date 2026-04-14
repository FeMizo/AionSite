"use client";

import { MessageCircle } from "lucide-react";
import type { WhatsAppFloatingButtonData } from "@/src/cms/types";

export function WhatsAppFloatingButton({
  data,
}: {
  data: WhatsAppFloatingButtonData;
}) {
  return (
    <a
      href={data.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-transform duration-200 ease-out hover:scale-105 active:scale-[0.97] active:duration-100"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 hidden whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-xl md:block">
        {data.tooltip}
      </span>
    </a>
  );
}
