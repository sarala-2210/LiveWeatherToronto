/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import Home from "@/app/page"
import AboutUs from "@/components/about-us"
import OurServices from "@/components/our-services"
import OurCustomers from "@/components/our-customers"
import { expect, jest } from "@jest/globals"

// Add jest-axe matchers
expect.extend(toHaveNoViolations)

// Mock components for Home page test
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

// Mock Date and timers for Home page
jest.mock("react", () => {
  const originalReact = jest.requireActual("react")
  return {
    ...originalReact,
    useEffect: jest.fn((callback) => {
      callback()
      return () => {}
    }),
  }
})

describe("Accessibility Tests", () => {
  beforeEach(() => {
    // Mock Date to return a fixed time
    const mockDate = new Date("2023-05-15T14:30:00")
    jest.spyOn(global, "Date").mockImplementation(() => mockDate)

    // Mock setInterval and clearInterval
    jest.spyOn(global, "setInterval").mockImplementation(() => 123 as unknown as NodeJS.Timeout)
    jest.spyOn(global, "clearInterval").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("AboutUs component has no accessibility violations", async () => {
    const { container } = render(<AboutUs />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("OurServices component has no accessibility violations", async () => {
    const { container } = render(<OurServices />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("OurCustomers component has no accessibility violations", async () => {
    const { container } = render(<OurCustomers />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("Home page has proper heading structure", () => {
    render(<Home />)

    // Check main heading
    const mainHeading = screen.getByRole("heading", { name: "TechVision Solutions" })
    expect(mainHeading).toBeInTheDocument()

    // Check section headings
    expect(screen.getByRole("heading", { name: "Current Weather" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Learn More About Us" })).toBeInTheDocument()
  })

  it("Home page has proper landmark regions", () => {
    render(<Home />)

    // Check for header, main, and footer landmarks
    expect(screen.getByRole("banner")).toBeInTheDocument() // header
    expect(screen.getByRole("main")).toBeInTheDocument() // main
    expect(screen.getByRole("contentinfo")).toBeInTheDocument() // footer
  })

  it("Tab interface is keyboard accessible", () => {
    render(<Home />)

    // Check tab elements have proper roles
    const tabs = screen.getAllByRole("tab")
    expect(tabs.length).toBe(3)

    // Check tabpanel is present
    expect(screen.getByRole("tabpanel")).toBeInTheDocument()
  })
})
