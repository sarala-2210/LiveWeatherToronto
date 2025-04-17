/**
 * @jest-environment node
 */

import { GET } from "@/app/api/weather/route"
import { describe, beforeEach, it, expect, jest } from "@jest/globals"

// Mock fetch
global.fetch = jest.fn()

// Mock environment variables
process.env.OPENWEATHER_API_KEY = "test-api-key"

describe("Weather API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns weather data when API call is successful", async () => {
    const mockWeatherData = {
      main: { temp: 20 },
      weather: [{ description: "clear sky", icon: "01d" }],
      name: "Toronto",
    }

    // Mock successful fetch
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.main.temp).toBe(20)
    expect(data.weather[0].description).toBe("clear sky")
    expect(data.name).toBe("Toronto")
    expect(data.timestamp).toBeDefined()
  })

  it("returns error when API call fails", async () => {
    // Mock failed fetch
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      text: async () => "Invalid API key",
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toContain("Weather API responded with status: 401")
  })

  it("returns error when API key is not set", async () => {
    // Temporarily remove API key
    const originalKey = process.env.OPENWEATHER_API_KEY
    delete process.env.OPENWEATHER_API_KEY

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe("API key configuration error")

    // Restore API key
    process.env.OPENWEATHER_API_KEY = originalKey
  })

  it("handles unexpected errors", async () => {
    // Mock fetch to throw an error
    ;(global.fetch as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Network error")
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe("Failed to fetch weather data")
    expect(data.message).toBe("Network error")
  })
})
