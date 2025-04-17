import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      hasApiKey: !!apiKey,
      apiKeyFirstChars: apiKey ? `${apiKey.substring(0, 4)}...` : "not set",
      apiKeyLength: apiKey ? apiKey.length : 0,
      vercelEnv: process.env.VERCEL_ENV || "not set",
      // Include other non-sensitive environment variables
      nodeVersion: process.version,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error checking environment",
        message: error.message,
      },
      { status: 500 },
    )
  }
}
