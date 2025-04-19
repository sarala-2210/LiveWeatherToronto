/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import WeatherDisplay from "@/components/weather-display"
import { expect, jest, beforeEach, describe, it } from "@jest/globals"

// Mock fetch
global.fetch = jest.fn()

describe("Error Handling", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Mock window.open
    window.open = jest.fn()
  })

  it("handles API errors gracefully", async () => {
    // Mock failed API response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({
        error: "Internal Server Error",
        details: "Something went wrong on the server",
      }),
    })

    render(<WeatherDisplay />)

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error 500/i)).toBeInTheDocument()
    })

    // Check error details
    expect(screen.getByText("Something went wrong on the server")).toBeInTheDocument()

    // Check retry button
    const retryButton = screen.getByText(/Retry/i)
    expect(retryButton).toBeInTheDocument()
  })

  it("handles network errors gracefully", async () => {
    // Mock network error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"))

    render(<WeatherDisplay />)

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Client error: Network error/i)).toBeInTheDocument()
    })
  })

  it("handles missing API key gracefully", async () => {
    // Mock API key error
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({
        error: "Invalid API key",
        details: "Please provide a valid API key",
      }),
    })

    render(<WeatherDisplay />)

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error 401/i)).toBeInTheDocument()
    })

    // Check error details
    expect(screen.getByText("Please provide a valid API key")).toBeInTheDocument()

    // Check environment button
    const envButton = screen.getByText("Check Environment")
    expect(envButton).toBeInTheDocument()

    // Click environment button
    fireEvent.click(envButton)

    // Verify window.open was called with correct URL
    expect(window.open).toHaveBeenCalledWith("/api/debug-env", "_blank")
  })

  it("recovers from errors after retry", async () => {
    // First fetch fails
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server error" }),
    })

    // Second fetch succeeds
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        main: {
          temp: 20,
          humidity: 65,
          feels_like: 18,
        },
        weather: [
          {
            description: "clear sky",
            icon: "01d",
            main: "Clear",
          },
        ],
        wind: {
          speed: 5.5,
        },
        name: "Toronto",
      }),
    })

    render(<WeatherDisplay />)

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/Error 500/i)).toBeInTheDocument()
    })

    // Click retry button
    const retryButton = screen.getByText(/Retry/i)
    fireEvent.click(retryButton)

    // Wait for successful data load
    await waitFor(() => {
      expect(screen.getByText("20°C")).toBeInTheDocument()
    })
  })
})
