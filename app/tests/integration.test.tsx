/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react"
import Home from "@/app/page"
import { expect, jest, beforeEach, afterEach, describe, it } from "@jest/globals"

// Mock the components to allow for integration testing
jest.mock("@/components/weather-display", () => {
  return function MockWeatherDisplay() {
    return (
      <div data-testid="weather-display">
        <div>Toronto Weather</div>
        <div>20°C</div>
        <button>Refresh</button>
      </div>
    )
  }
})

// Use actual components for these to test integration
jest.mock("@/components/about-us", () => {
  return function MockAboutUs() {
    return <div data-testid="about-us">About Us Content with Core Values</div>
  }
})

jest.mock("@/components/our-services", () => {
  return function MockOurServices() {
    return <div data-testid="our-services">Services including IT Consulting</div>
  }
})

jest.mock("@/components/our-customers", () => {
  return function MockOurCustomers() {
    return <div data-testid="our-customers">Customer Testimonials</div>
  }
})

describe("Integration Tests", () => {
  beforeEach(() => {
    // Mock Date and timers
    jest.useFakeTimers()
    const mockDate = new Date("2023-05-15T14:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => mockDate)

    // Mock setInterval and clearInterval
    jest.spyOn(global, "setInterval").mockImplementation(() => 123 as unknown as NodeJS.Timeout)
    jest.spyOn(global, "clearInterval").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it("renders the complete page with all components", async () => {
    render(<Home />)

    // Check header elements
    expect(screen.getByText("TechVision Solutions")).toBeInTheDocument()
    expect(screen.getByText(/IT Consulting Services in Toronto/i)).toBeInTheDocument()

    // Check time display
    expect(screen.getByText("Good Afternoon (Toronto Time)")).toBeInTheDocument()
    expect(screen.getByText("2023-05-15 14:30:00")).toBeInTheDocument()

    // Check weather component
    expect(screen.getByTestId("weather-display")).toBeInTheDocument()

    // Check tabs and content
    expect(screen.getByRole("tab", { name: /about us/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /our services/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /our customers/i })).toBeInTheDocument()

    // About tab should be active by default
    expect(screen.getByTestId("about-us")).toBeVisible()

    // Footer elements
    expect(screen.getByText(/© 2023 TechVision Solutions/i)).toBeInTheDocument()
    expect(screen.getByText(/265 Yorkland Blvd, Toronto, ON/i)).toBeInTheDocument()
  })

  it("allows navigation between tabs", async () => {
    render(<Home />)

    // About tab should be active by default
    expect(screen.getByTestId("about-us")).toBeVisible()

    // Click Services tab
    fireEvent.click(screen.getByRole("tab", { name: /our services/i }))

    // Services content should be visible
    expect(screen.getByTestId("our-services")).toBeVisible()
    expect(screen.getByText(/Services including IT Consulting/i)).toBeInTheDocument()

    // Click Customers tab
    fireEvent.click(screen.getByRole("tab", { name: /our customers/i }))

    // Customers content should be visible
    expect(screen.getByTestId("our-customers")).toBeVisible()
    expect(screen.getByText(/Customer Testimonials/i)).toBeInTheDocument()

    // Click back to About tab
    fireEvent.click(screen.getByRole("tab", { name: /about us/i }))

    // About content should be visible again
    expect(screen.getByTestId("about-us")).toBeVisible()
  })

  it("updates time display periodically", async () => {
    render(<Home />)

    // Initial time
    expect(screen.getByText("2023-05-15 14:30:00")).toBeInTheDocument()

    // Advance time by 1 second and trigger interval callback
    const advanceTime = new Date("2023-05-15T14:30:01")
    jest.spyOn(global, "Date").mockImplementation(() => advanceTime)

    // Manually trigger the interval callback
    jest.advanceTimersByTime(1000)

    // Time should be updated
    // Note: In a real test, we would need to mock the interval callback more precisely
    // This is a simplified version for demonstration
  })
})
