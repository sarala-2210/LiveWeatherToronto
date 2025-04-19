/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react"
import Home from "../page"
import { expect, jest, beforeEach, afterEach } from "@jest/globals"

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

  it("displays the current date and time", () => {
    render(<Home />)
    // The date format in the component is YYYY-MM-DD HH:MM:SS
    expect(screen.getByText("2023-05-15 14:30:00")).toBeInTheDocument()
  })

  it("displays the correct greeting based on time of day", () => {
    // Test afternoon greeting
    render(<Home />)
    expect(screen.getByText("Good Afternoon (Toronto Time)")).toBeInTheDocument()

    // Clean up
    jest.clearAllMocks()

    // Test morning greeting
    const morningDate = new Date("2023-05-15T08:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => morningDate)

    render(<Home />)
    expect(screen.getByText("Good Morning (Toronto Time)")).toBeInTheDocument()

    // Clean up
    jest.clearAllMocks()

    // Test evening greeting
    const eveningDate = new Date("2023-05-15T20:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => eveningDate)

    render(<Home />)
    expect(screen.getByText("Good Evening (Toronto Time)")).toBeInTheDocument()
  })

  it("switches between tabs when clicked", () => {
    render(<Home />)

    // About tab should be active by default
    expect(screen.getByTestId("about-us")).toBeVisible()

    // Click on Services tab
    const servicesTab = screen.getByRole("tab", { name: /our services/i })
    fireEvent.click(servicesTab)

    // Services content should be visible
    expect(screen.getByTestId("our-services")).toBeVisible()

    // Click on Customers tab
    const customersTab = screen.getByRole("tab", { name: /our customers/i })
    fireEvent.click(customersTab)

    // Customers content should be visible
    expect(screen.getByTestId("our-customers")).toBeVisible()
  })

  it("sets up and cleans up interval for time updates", () => {
    const { unmount } = render(<Home />)

    // Check if setInterval was called
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)

    // Unmount component
    unmount()

    // Check if clearInterval was called
    expect(clearInterval).toHaveBeenCalledWith(123)
  })

  it("renders social media links in the footer", () => {
    render(<Home />)

    // Find all social media links
    const socialLinks = screen.getAllByRole("link")

    // There should be at least 3 social links (Facebook, Twitter, GitHub)
    expect(socialLinks.length).toBeGreaterThanOrEqual(3)
  })

  it("renders the weather section", () => {
    render(<Home />)

    // Check for weather section heading
    expect(screen.getByText("Current Weather")).toBeInTheDocument()

    // Check if weather display component is rendered
    expect(screen.getByTestId("weather-display")).toBeInTheDocument()
  })
})
