/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import Home from "../page"
import { expect, jest, beforeEach, afterEach, describe, it } from "@jest/globals"

// Mock the components to simplify testing
jest.mock("@/components/weather-display", () => {
  return function MockWeatherDisplay() {
    return <div data-testid="weather-display">Weather Display</div>
  }
})

jest.mock("@/components/about-us", () => {
  return function MockAboutUs() {
    return <div data-testid="about-us">About Us Content</div>
  }
})

jest.mock("@/components/our-services", () => {
  return function MockOurServices() {
    return <div data-testid="our-services">Our Services Content</div>
  }
})

jest.mock("@/components/our-customers", () => {
  return function MockOurCustomers() {
    return <div data-testid="our-customers">Our Customers Content</div>
  }
})

// Mock useEffect to control time updates
jest.mock("react", () => {
  const originalReact = jest.requireActual("react")
  return {
    ...originalReact,
    useEffect: jest.fn((callback, deps) => {
      if (deps?.length === 0) {
        callback()
      }
      return () => {}
    }),
  }
})

describe("Home Page", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()

    // Mock Date to return a fixed time
    const mockDate = new Date("2023-05-15T14:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => mockDate)

    // Mock setInterval and clearInterval
    jest.spyOn(global, "setInterval").mockImplementation((cb) => {
      return 123 as unknown as NodeJS.Timeout
    })
    jest.spyOn(global, "clearInterval").mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore Date and timers
    jest.restoreAllMocks()
  })

  it("renders the company name", () => {
    render(<Home />)
    // Use getAllByText since the company name appears multiple times
    const companyNames = screen.getAllByText("TechVision Solutions")
    expect(companyNames.length).toBeGreaterThan(0)
  })

  it("renders the tab navigation", () => {
    render(<Home />)
    const aboutTab = screen.getByRole("tab", { name: /about us/i })
    const servicesTab = screen.getByRole("tab", { name: /our services/i })
    const customersTab = screen.getByRole("tab", { name: /our customers/i })

    expect(aboutTab).toBeInTheDocument()
    expect(servicesTab).toBeInTheDocument()
    expect(customersTab).toBeInTheDocument()
  })

  it("renders the footer with copyright", () => {
    render(<Home />)
    const currentYear = new Date().getFullYear().toString()
    const copyright = screen.getByText(new RegExp(`© ${currentYear} TechVision Solutions`))
    expect(copyright).toBeInTheDocument()
  })

  it("displays the current date and time", () => {
    render(<Home />)
    // The date format in the component is YYYY-MM-DD HH:MM:SS
    expect(screen.getByText("2023-05-15 14:30:00")).toBeInTheDocument()
  })

  it("displays the correct greeting based on time of day", () => {
    // Test afternoon greeting (using the default mock date)
    render(<Home />)
    expect(screen.getByText(/Good Afternoon/)).toBeInTheDocument()

    // Clean up
    jest.clearAllMocks()

    // Test morning greeting
    const morningDate = new Date("2023-05-15T08:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => morningDate)

    render(<Home />)
    expect(screen.getByText(/Good Morning/)).toBeInTheDocument()

    // Clean up
    jest.clearAllMocks()

    // Test evening greeting
    const eveningDate = new Date("2023-05-15T20:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => eveningDate)

    render(<Home />)
    expect(screen.getByText(/Good Evening/)).toBeInTheDocument()
  })

  it("renders the weather section", () => {
    render(<Home />)

    // Check for weather section heading
    expect(screen.getByText("Current Weather")).toBeInTheDocument()

    // Check if weather display component is rendered
    expect(screen.getByTestId("weather-display")).toBeInTheDocument()
  })
})
