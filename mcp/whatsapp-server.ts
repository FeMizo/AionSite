import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { markMessageRead, sendTemplateMessage, sendTextMessage } from "../src/lib/whatsapp/meta.js";
import { getConversation, listConversations, searchConversations } from "../src/lib/whatsapp/store.js";

const server = new McpServer({ name: "aionsite-whatsapp", version: "1.0.0" });
const text = (value: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] });

server.registerTool("whatsapp_list_conversations", {
  description: "Lista conversaciones locales de WhatsApp con paginación por cursor.",
  inputSchema: z.object({ limit: z.number().int().min(1).max(200).default(50), cursor: z.string().optional() }),
}, async ({ limit, cursor }) => text(await listConversations(limit, cursor)));

server.registerTool("whatsapp_get_conversation", {
  description: "Obtiene una conversación y sus mensajes por ID local o número WhatsApp.",
  inputSchema: z.object({ id: z.string().min(1) }),
}, async ({ id }) => text(await getConversation(id)));

server.registerTool("whatsapp_search_conversations", {
  description: "Busca conversaciones por número, nombre o contenido de mensaje.",
  inputSchema: z.object({ query: z.string().min(1), limit: z.number().int().min(1).max(200).default(50) }),
}, async ({ query, limit }) => text(await searchConversations(query, limit)));

server.registerTool("whatsapp_send_message", {
  description: "Envía un mensaje de texto. Requiere approved=true mientras esté activa la aprobación manual.",
  inputSchema: z.object({ to: z.string().regex(/^\d{8,15}$/), body: z.string().min(1).max(4096), approved: z.boolean().default(false) }),
}, async ({ to, body, approved }) => text(await sendTextMessage({ to, body, approved, actor: "mcp" })));

server.registerTool("whatsapp_send_template", {
  description: "Envía una plantilla aprobada por Meta. Requiere approved=true mientras esté activa la aprobación manual.",
  inputSchema: z.object({ to: z.string().regex(/^\d{8,15}$/), templateName: z.string().regex(/^[a-z0-9_]+$/), languageCode: z.string().min(2).max(10), components: z.array(z.unknown()).optional(), approved: z.boolean().default(false) }),
}, async ({ to, templateName, languageCode, components, approved }) => text(await sendTemplateMessage({ to, templateName, languageCode, components, approved, actor: "mcp" })));

server.registerTool("whatsapp_mark_read", {
  description: "Marca como leído un mensaje recibido en WhatsApp.",
  inputSchema: z.object({ messageId: z.string().min(1) }),
}, async ({ messageId }) => text(await markMessageRead(messageId)));

const transport = new StdioServerTransport();
await server.connect(transport);
