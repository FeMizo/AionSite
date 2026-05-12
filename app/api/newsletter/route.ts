import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_EMAIL = 254;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000;

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

  const { email } = body;

  if (!email || typeof email !== "string" || email.length > MAX_EMAIL || !isValidEmail(email)) {
    return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  }

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
    from: `"AionSite" <${process.env.SMTP_USER}>`,
    to: "contacto@aionsite.com.mx",
    replyTo: email,
    subject: `Nuevo registro al newsletter — ${email}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Nuevo registro al newsletter (popup)</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p style="color: #64748b; font-size: 14px;">Este usuario quiere ser avisado del lanzamiento del dashboard el 18 de mayo de 2026.</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
