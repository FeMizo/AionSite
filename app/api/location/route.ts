import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0] : realIp || "127.0.0.1";

    // For local development, return default
    if (ip === "127.0.0.1" || ip === "::1") {
      return NextResponse.json({
        city: "Cancún",
        region: "Quintana Roo",
        country: "MX",
      });
    }

    // Use ipapi.co for geolocation
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.reason);
    }

    return NextResponse.json({
      city: data.city || "Cancún",
      region: data.region || "Quintana Roo",
      country: data.country_code || "MX",
    });
  } catch (error) {
    console.error("Geolocation error:", error);
    // Fallback
    return NextResponse.json({
      city: "Cancún",
      region: "Quintana Roo",
      country: "MX",
    });
  }
}