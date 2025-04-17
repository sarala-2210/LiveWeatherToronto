/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react"
import Home from "../page"
import { expect } from "@jest/globals"

// Mock the useEffect hook to control time updates
jest.mock("react", () => {
  const originalReact = jest.requireActual("react")
  return {
    ...originalReact,
    useEffect: jest.fn((callback) => {
      const cleanup = callback()
      return cleanup
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
    const companyName = screen.getByText("Company Inc.")
    expect(companyName).toBeInTheDocument()
  })

  it("renders the date time display", () => {
    render(<Home />)
    // This will match the date-time format pattern
    const dateTimeRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/
    const dateTimeElement = screen.getByText(dateTimeRegex)
    expect(dateTimeElement).toBeInTheDocument()
  })

  it("renders the weather component", () => {
    render(<Home />)
    const weatherComponent = screen.getByTestId("weather-display")
    expect(weatherComponent).toBeInTheDocument()
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

  it("changes tab content when clicking on tabs", () => {
    render(<Home />)

    // Initially About tab should be visible
    expect(screen.getByTestId("about-us")).toBeInTheDocument()

    // Click on Services tab
    const servicesTab = screen.getByRole("tab", { name: /our services/i })
    fireEvent.click(servicesTab)

    // Services content should be visible
    expect(screen.getByTestId("our-services")).toBeInTheDocument()

    // Click on Customers tab
    const customersTab = screen.getByRole("tab", { name: /our customers/i })
    fireEvent.click(customersTab)

    // Customers content should be visible
    expect(screen.getByTestId("our-customers")).toBeInTheDocument()
  })

  it("renders the footer with copyright", () => {
    render(<Home />)
    const currentYear = new Date().getFullYear().toString()
    const copyright = screen.getByText(new RegExp(`© ${currentYear} Company Inc.`))
    expect(copyright).toBeInTheDocument()
  })

  it("displays the correct greeting based on time of day", () => {
    // Morning test (8 AM)
    const morningDate = new Date("2023-05-15T08:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => morningDate)

    const { unmount, getByText } = render(<Home />)
    expect(getByText(/Good Morning/i)).toBeInTheDocument()
    unmount()

    // Afternoon test (2 PM)
    const afternoonDate = new Date("2023-05-15T14:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => afternoonDate)

    const { unmount: unmount2, getByText: getByText2 } = render(<Home />)
    expect(getByText2(/Good Afternoon/i)).toBeInTheDocument()
    unmount2()

    // Evening test (8 PM)
    const eveningDate = new Date("2023-05-15T20:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => eveningDate)

    const { getByText: getByText3 } = render(<Home />)
    expect(getByText3(/Good Evening/i)).toBeInTheDocument()
  })
})
