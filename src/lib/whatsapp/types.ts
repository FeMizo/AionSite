export type WhatsAppMessageDirection = "inbound" | "outbound";
export type WhatsAppMessageStatus = "received" | "pending_approval" | "sent" | "delivered" | "read" | "failed";

export type WhatsAppMessage = {
  id: string;
  conversationId: string;
  waMessageId?: string;
  direction: WhatsAppMessageDirection;
  from: string;
  to: string;
  type: "text" | "template" | "unknown";
  body: string;
  status: WhatsAppMessageStatus;
  createdAt: string;
  error?: string;
};

export type WhatsAppConversation = {
  id: string;
  waId: string;
  displayName?: string;
  lastMessageAt: string;
  messages: WhatsAppMessage[];
};

export type WhatsAppAuditEntry = {
  id: string;
  action: string;
  actor: string;
  recipient?: string;
  messageId?: string;
  status: "accepted" | "rejected" | "succeeded" | "failed";
  detail?: string;
  createdAt: string;
};

export type WhatsAppStore = {
  conversations: WhatsAppConversation[];
  audit: WhatsAppAuditEntry[];
};
