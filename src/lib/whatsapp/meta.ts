import { createHmac, timingSafeEqual } from "node:crypto";
import { assertWhatsAppSendConfig, getWhatsAppConfig } from "./config";
import { addAudit, addMessage, updateMessageStatus } from "./store";

export function verifyMetaSignature(rawBody: string, signature: string | null) {
  const secret = getWhatsAppConfig().appSecret;
  if (!secret || !signature?.startsWith("sha256=")) return false;
  const expected = Buffer.from(`sha256=${createHmac("sha256", secret).update(rawBody, "utf8").digest("hex")}`);
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

async function graphRequest<T>(path: string, body: Record<string, unknown>) {
  const config = assertWhatsAppSendConfig();
  const response = await fetch(`https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!response.ok) throw new Error(payload.error?.message ?? `Meta respondió ${response.status}.`);
  return payload;
}

export async function sendTextMessage(input: { to: string; body: string; actor: string; approved: boolean }) {
  const config = getWhatsAppConfig();
  if (config.approvalRequired && !input.approved) {
    await addAudit({ action: "send_text", actor: input.actor, recipient: input.to, status: "rejected", detail: "approval_required" });
    return { sent: false as const, reason: "approval_required" as const };
  }
  const sendConfig = assertWhatsAppSendConfig();

  try {
    const result = await graphRequest<{ messages?: Array<{ id: string }> }>("/messages", {
      messaging_product: "whatsapp", recipient_type: "individual", to: input.to, type: "text",
      text: { preview_url: false, body: input.body },
    });
    const waMessageId = result.messages?.[0]?.id;
    const message = await addMessage({ waMessageId, direction: "outbound", from: sendConfig.phoneNumberId, to: input.to, type: "text", body: input.body, status: "sent", createdAt: new Date().toISOString() });
    await addAudit({ action: "send_text", actor: input.actor, recipient: input.to, messageId: message.id, status: "succeeded" });
    return { sent: true as const, message };
  } catch (error) {
    await addAudit({ action: "send_text", actor: input.actor, recipient: input.to, status: "failed", detail: error instanceof Error ? error.message : "unknown_error" });
    throw error;
  }
}

export async function sendTemplateMessage(input: { to: string; templateName: string; languageCode: string; components?: unknown[]; actor: string; approved: boolean }) {
  const config = getWhatsAppConfig();
  if (config.approvalRequired && !input.approved) {
    await addAudit({ action: "send_template", actor: input.actor, recipient: input.to, status: "rejected", detail: "approval_required" });
    return { sent: false as const, reason: "approval_required" as const };
  }
  const sendConfig = assertWhatsAppSendConfig();
  const result = await graphRequest<{ messages?: Array<{ id: string }> }>("/messages", {
    messaging_product: "whatsapp", to: input.to, type: "template",
    template: { name: input.templateName, language: { code: input.languageCode }, ...(input.components ? { components: input.components } : {}) },
  });
  const message = await addMessage({ waMessageId: result.messages?.[0]?.id, direction: "outbound", from: sendConfig.phoneNumberId, to: input.to, type: "template", body: `[template:${input.templateName}]`, status: "sent", createdAt: new Date().toISOString() });
  await addAudit({ action: "send_template", actor: input.actor, recipient: input.to, messageId: message.id, status: "succeeded" });
  return { sent: true as const, message };
}

export async function markMessageRead(messageId: string) {
  await graphRequest("/messages", { messaging_product: "whatsapp", status: "read", message_id: messageId });
  await updateMessageStatus(messageId, "read");
  return { ok: true };
}

export async function processWebhook(payload: any) {
  const changes = payload?.entry?.flatMap((entry: any) => entry.changes ?? []) ?? [];
  for (const change of changes) {
    const value = change.value ?? {};
    for (const message of value.messages ?? []) {
      const body = message.type === "text" ? message.text?.body ?? "" : `[${message.type}]`;
      await addMessage({ waMessageId: message.id, direction: "inbound", from: message.from, to: value.metadata?.phone_number_id ?? "unknown", type: message.type === "text" ? "text" : "unknown", body, status: "received", createdAt: new Date(Number(payload.entry?.[0]?.time ?? Date.now())).toISOString(), displayName: value.contacts?.[0]?.profile?.name });
    }
    for (const status of value.statuses ?? []) {
      const mapped = status.status === "delivered" ? "delivered" : status.status === "read" ? "read" : status.status === "failed" ? "failed" : "sent";
      await updateMessageStatus(status.id, mapped, status.errors?.[0]?.title);
    }
  }
  return { received: true };
}
