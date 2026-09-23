import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { WhatsAppAuditEntry, WhatsAppConversation, WhatsAppMessage, WhatsAppStore } from "./types";

const emptyStore: WhatsAppStore = { conversations: [], audit: [] };

function storePath() {
  return process.env.WHATSAPP_DATA_FILE ?? path.join(process.cwd(), ".data", "whatsapp.json");
}

async function readStore(): Promise<WhatsAppStore> {
  try {
    const raw = await readFile(storePath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<WhatsAppStore>;
    return { conversations: parsed.conversations ?? [], audit: parsed.audit ?? [] };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(emptyStore);
    throw error;
  }
}

async function writeStore(store: WhatsAppStore) {
  const target = storePath();
  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  await rename(temporary, target);
}

function conversationFor(store: WhatsAppStore, waId: string, displayName?: string) {
  let conversation = store.conversations.find((item) => item.waId === waId);
  if (!conversation) {
    conversation = { id: `wa_${waId}`, waId, displayName, lastMessageAt: new Date().toISOString(), messages: [] };
    store.conversations.push(conversation);
  } else if (displayName && !conversation.displayName) {
    conversation.displayName = displayName;
  }
  return conversation;
}

export async function addMessage(input: Omit<WhatsAppMessage, "id" | "conversationId"> & { displayName?: string }) {
  const store = await readStore();
  const conversation = conversationFor(store, input.direction === "inbound" ? input.from : input.to, input.displayName);
  const message: WhatsAppMessage = { ...input, id: randomUUID(), conversationId: conversation.id };
  conversation.messages.push(message);
  conversation.lastMessageAt = message.createdAt;
  await writeStore(store);
  return message;
}

export async function updateMessageStatus(waMessageId: string, status: WhatsAppMessage["status"], error?: string) {
  const store = await readStore();
  for (const conversation of store.conversations) {
    const message = conversation.messages.find((item) => item.waMessageId === waMessageId);
    if (message) {
      message.status = status;
      if (error) message.error = error;
      await writeStore(store);
      return message;
    }
  }
  return null;
}

export async function listConversations(limit = 50, cursor?: string) {
  const store = await readStore();
  const sorted = [...store.conversations].sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
  const start = cursor ? Math.max(0, sorted.findIndex((item) => item.id === cursor) + 1) : 0;
  const items = sorted.slice(start, start + Math.min(Math.max(limit, 1), 200));
  return { items, nextCursor: sorted[start + items.length]?.id };
}

export async function getConversation(id: string) {
  const store = await readStore();
  return store.conversations.find((item) => item.id === id || item.waId === id) ?? null;
}

export async function searchConversations(query: string, limit = 50) {
  const store = await readStore();
  const normalized = query.trim().toLowerCase();
  return store.conversations
    .filter((item) => `${item.waId} ${item.displayName ?? ""} ${item.messages.map((message) => message.body).join(" ")}`.toLowerCase().includes(normalized))
    .slice(0, Math.min(Math.max(limit, 1), 200));
}

export async function addAudit(input: Omit<WhatsAppAuditEntry, "id" | "createdAt">) {
  const store = await readStore();
  const entry = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
  store.audit.push(entry);
  await writeStore(store);
  return entry;
}

export async function recordContactFormLead(input: { name: string; email: string; message: string }) {
  return addAudit({ action: "contact_form_submitted", actor: "contact_form", status: "accepted", detail: JSON.stringify(input) });
}
