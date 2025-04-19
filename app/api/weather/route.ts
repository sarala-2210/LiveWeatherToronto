import { NextResponse } from "next/server"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

export async function GET() {
  try {
    // Access the environment variable
    const apiKey = process.env.OPENWEATHER_API_KEY

    // Log environment variable status (safely)
    console.log("Environment check:", {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
    })

    if (!apiKey) {
      console.error("OPENWEATHER_API_KEY environment variable is not set")
      return NextResponse.json({ error: "API key configuration error" }, { status: 500 })
    }

    // Explicitly specify Toronto, Canada with coordinates for more accuracy
    // Toronto coordinates: 43.6532° N, 79.3832° W
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=43.6532&lon=-79.3832&units=metric&appid=${apiKey}`
    console.log("Fetching from URL:", url.replace(apiKey, "REDACTED"))

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Weather API error status:", response.status)
      console.error("Weather API error response:", errorText)
      return NextResponse.json(
        { error: `Weather API responded with status: ${response.status}`, details: errorText },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Weather API success, data received:", {
      city: data.name,
      temp: data.main?.temp,
      weather: data.weather?.[0]?.description,
    })

    // Add a timestamp to verify freshness of data
    data.timestamp = new Date().toISOString()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Weather API unexpected error:", error)
    return NextResponse.json(
      { error: "Failed to fetch weather data", message: error.message, stack: error.stack },
      { status: 500 },
    )
  }
}
