import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { processWebhook, sendTextMessage, verifyMetaSignature } from "../src/lib/whatsapp/meta";
import { getConversation } from "../src/lib/whatsapp/store";

test("verifies Meta webhook signatures and rejects tampering", () => {
  process.env.WHATSAPP_APP_SECRET = "test-secret";
  const body = JSON.stringify({ hello: "world" });
  const signature = `sha256=${createHmac("sha256", "test-secret").update(body).digest("hex")}`;
  assert.equal(verifyMetaSignature(body, signature), true);
  assert.equal(verifyMetaSignature(`${body}.changed`, signature), false);
});

test("does not send outbound messages without manual approval", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "aionsite-wa-"));
  process.env.WHATSAPP_DATA_FILE = path.join(directory, "whatsapp.json");
  process.env.WHATSAPP_REQUIRE_APPROVAL = "true";
  delete process.env.WHATSAPP_ACCESS_TOKEN;
  delete process.env.WHATSAPP_PHONE_NUMBER_ID;
  const result = await sendTextMessage({ to: "5219999999999", body: "No enviar", actor: "test", approved: false });
  assert.deepEqual(result, { sent: false, reason: "approval_required" });
});

test("persists inbound messages and delivery status from one webhook", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "aionsite-wa-"));
  process.env.WHATSAPP_DATA_FILE = path.join(directory, "whatsapp.json");
  await processWebhook({ entry: [{ time: 1700000000, changes: [{ value: { metadata: { phone_number_id: "123" }, contacts: [{ profile: { name: "Ana" } }], messages: [{ id: "wamid.inbound", from: "5219999999999", type: "text", text: { body: "Hola" } }] } }] }] });
  const conversation = await getConversation("5219999999999");
  assert.equal(conversation?.displayName, "Ana");
  assert.equal(conversation?.messages[0]?.body, "Hola");
  await processWebhook({ entry: [{ changes: [{ value: { statuses: [{ id: "wamid.inbound", status: "read" }] } }] }] });
  const updated = await getConversation("5219999999999");
  assert.equal(updated?.messages[0]?.status, "read");
  const raw = await readFile(path.join(directory, "whatsapp.json"), "utf8");
  assert.equal(raw.includes("wamid.inbound"), true);
});
