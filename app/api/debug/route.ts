import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    hasApiKey: !!process.env.OPENWEATHER_API_KEY,
    // Don't return the actual key in production!
    apiKeyPrefix: process.env.OPENWEATHER_API_KEY ? process.env.OPENWEATHER_API_KEY.substring(0, 4) + "..." : "not set",
  })
}
