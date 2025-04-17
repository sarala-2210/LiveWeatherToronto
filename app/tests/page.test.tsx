/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import Home from "../page"
import { expect, jest } from "@jest/globals"

// Mock the useEffect hook to prevent infinite loops
jest.mock("react", () => {
  const originalReact = jest.requireActual("react")
  return {
    ...originalReact,
    useEffect: jest.fn((callback) => {
      // Don't actually call the callback to prevent setInterval
      return () => {}
    }),
  }
})

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

describe("Home Page", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()

    // Mock Date to return a fixed time
    const mockDate = new Date("2023-05-15T14:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => mockDate)
  })

  afterEach(() => {
    // Restore Date
    jest.restoreAllMocks()
  })

  it("renders the company name", () => {
    render(<Home />)
    const companyName = screen.getByText("TechVision Solutions")
    expect(companyName).toBeInTheDocument()
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
})
