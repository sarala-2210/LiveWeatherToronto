/**
 * @jest-environment node
 */

import { getTorontoWeather } from "@/app/weather-service"
import { expect, describe, it, jest, beforeEach } from "@jest/globals"

// Mock fetch
global.fetch = jest.fn()

describe("Weather Service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("fetches weather data successfully", async () => {
    const mockWeatherData = {
      main: { temp: 20 },
      weather: [{ description: "clear sky" }],
    }

    // Mock successful fetch
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    })

    const result = await getTorontoWeather("test-api-key")

    // Check if fetch was called with correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&units=metric&appid=test-api-key",
    )

    // Check if result matches mock data
    expect(result).toEqual(mockWeatherData)
  })

  it("throws error when fetch fails", async () => {
    // Mock failed fetch
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    })

    // Check if function throws error
    await expect(getTorontoWeather("invalid-key")).rejects.toThrow("Failed to fetch weather data")
  })

  it("throws error when network error occurs", async () => {
    // Mock network error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"))

    // Check if function throws error
    await expect(getTorontoWeather("test-api-key")).rejects.toThrow("Network error")
  })
})
