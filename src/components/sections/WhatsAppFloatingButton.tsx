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
      data-whatsapp-floating="true"
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#128c4a] text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#0e703b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.07 0C5.49 0 .13 5.35.13 11.93c0 2.1.55 4.16 1.6 5.97L.03 24l6.25-1.64a11.9 11.9 0 0 0 5.78 1.47h.01C18.65 23.83 24 18.48 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.07 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.95 9.87Zm5.45-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" /></svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-xl group-hover:block group-focus-visible:block max-sm:!hidden">
        {data.tooltip}
      </span>
    </a>
  );
}
