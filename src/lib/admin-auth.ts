import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_token";

function matchesToken(candidate: string | undefined, expected: string) {
  if (!candidate) return false;
  const candidateBuffer = Buffer.from(candidate);
  const expectedBuffer = Buffer.from(expected);
  return candidateBuffer.length === expectedBuffer.length && timingSafeEqual(candidateBuffer, expectedBuffer);
}

export async function isAdminRequest(request: Request) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const authorization = request.headers.get("authorization");
  const bearer = authorization?.startsWith("Bearer ") ? authorization.slice(7) : undefined;
  const cookieToken = (await cookies()).get(ADMIN_COOKIE)?.value;
  return matchesToken(cookieToken, expected) || matchesToken(bearer, expected);
}

export async function requireAdmin(request: Request) {
  if (await isAdminRequest(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 8,
};
