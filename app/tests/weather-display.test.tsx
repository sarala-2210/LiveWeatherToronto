/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import WeatherDisplay from "@/components/weather-display"

// Mock the fetch function
global.fetch = jest.fn()

// Sample weather data for testing
const mockWeatherData = {
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
}

describe("WeatherDisplay Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("displays loading state initially", () => {
    // Mock the fetch to never resolve during this test
    ;(global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}))

    render(<WeatherDisplay />)

    // Check for loading indicators (skeletons)
    const skeletons = document.querySelectorAll(".skeleton")
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it("displays weather data when fetch is successful", async () => {
    // Mock successful response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    })

    render(<WeatherDisplay />)

    // Wait for the temperature to be displayed
    await waitFor(() => {
      expect(screen.getByText("20°C")).toBeInTheDocument()
    })

    // Check for weather description
    expect(screen.getByText("clear sky")).toBeInTheDocument()

    // Check for humidity
    expect(screen.getByText("65%")).toBeInTheDocument()

    // Check for wind speed (converted to km/h)
    expect(screen.getByText("20 km/h")).toBeInTheDocument()

    // Check for feels like temperature
    expect(screen.getByText("18°C")).toBeInTheDocument()
  })

  it("displays error message when fetch fails", async () => {
    // Mock failed response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server error" }),
    })

    render(<WeatherDisplay />)

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/Error 500/i)).toBeInTheDocument()
    })
  })

  it("retries fetching data when retry button is clicked", async () => {
    // First fetch fails
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server error" }),
    })

    // Second fetch succeeds
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    })

    render(<WeatherDisplay />)

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/Error 500/i)).toBeInTheDocument()
    })

    // Click retry button
    const retryButton = screen.getByText(/Retry/i)
    fireEvent.click(retryButton)

    // Wait for the temperature to be displayed after retry
    await waitFor(() => {
      expect(screen.getByText("20°C")).toBeInTheDocument()
    })
  })

  it("displays different styles based on weather condition", async () => {
    // Test clear weather
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockWeatherData,
        weather: [{ description: "clear sky", icon: "01d", main: "Clear" }],
      }),
    })

    const { unmount } = render(<WeatherDisplay />)

    await waitFor(() => {
      expect(screen.getByText("clear sky")).toBeInTheDocument()
    })

    unmount()

    // Test cloudy weather
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockWeatherData,
        weather: [{ description: "scattered clouds", icon: "03d", main: "Clouds" }],
      }),
    })

    const { unmount: unmount2 } = render(<WeatherDisplay />)

    await waitFor(() => {
      expect(screen.getByText("scattered clouds")).toBeInTheDocument()
    })

    unmount2()

    // Test rainy weather
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockWeatherData,
        weather: [{ description: "light rain", icon: "10d", main: "Rain" }],
      }),
    })

    render(<WeatherDisplay />)

    await waitFor(() => {
      expect(screen.getByText("light rain")).toBeInTheDocument()
    })
  })
})
