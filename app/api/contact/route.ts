import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

// Tracks submissions per IP: { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;       // max submissions
const RATE_WINDOW = 60_000; // per 1 minute

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera un momento." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campos requeridos." }, { status: 400 });
  }

  if (typeof name !== "string" || name.length > MAX_NAME) {
    return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
  }

  if (typeof email !== "string" || email.length > MAX_EMAIL || !isValidEmail(email)) {
    return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  }

  if (typeof message !== "string" || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Mensaje inválido." }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"AionSite Blog" <${process.env.SMTP_USER}>`,
    to: "contacto@aionsite.com.mx",
    replyTo: email,
    subject: `Nuevo mensaje de ${safeName} desde el blog`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Nuevo mensaje desde el blog</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Correo:</strong> ${safeEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="background: #f1f5f9; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${safeMessage}</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
