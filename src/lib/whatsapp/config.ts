export function getWhatsAppConfig() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  return {
    accessToken,
    phoneNumberId,
    appSecret,
    verifyToken,
    apiVersion: process.env.WHATSAPP_GRAPH_API_VERSION ?? "v23.0",
    approvalRequired: process.env.WHATSAPP_REQUIRE_APPROVAL !== "false",
  };
}

export function assertWhatsAppSendConfig() {
  const config = getWhatsAppConfig();
  if (!config.accessToken || !config.phoneNumberId) {
    throw new Error("WhatsApp Cloud API no está configurada: faltan WHATSAPP_ACCESS_TOKEN o WHATSAPP_PHONE_NUMBER_ID.");
  }
  return config as typeof config & { accessToken: string; phoneNumberId: string };
}
