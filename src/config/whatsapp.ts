export const whatsappConfig = {
  phoneE164: "5219381573988",
  defaultMessage:
    "Hola AionSite, me gustaría recibir una cotización para un proyecto web.",
};

export function getWhatsAppLink(message?: string) {
  const msg = message || whatsappConfig.defaultMessage;
  return `https://wa.me/${whatsappConfig.phoneE164}?text=${encodeURIComponent(msg)}`;
}
