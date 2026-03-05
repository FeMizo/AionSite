"use client";

import { siteData } from "@/src/data/site";
import { MessageCircle } from "lucide-react";

export const WhatsAppFloatingButton = () => {
  return (
    <a
      href={siteData.whatsappFloatingButton.data.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 hidden whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white md:block shadow-xl">
        {siteData.whatsappFloatingButton.data.tooltip}
      </span>
    </a>
  );
};