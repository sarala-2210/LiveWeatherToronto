import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.OPENWEATHER_API_KEY,
    // Don't expose the actual key, just show if it exists
    keyStatus: process.env.OPENWEATHER_API_KEY ? "Set" : "Not set",
  })
}
