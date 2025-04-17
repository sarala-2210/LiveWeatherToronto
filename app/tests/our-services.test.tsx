/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import OurServices from "@/components/our-services"

describe("OurServices Component", () => {
  it("renders the component title", () => {
    render(<OurServices />)
    expect(screen.getByText("Our Services")).toBeInTheDocument()
  })

  it("renders all service items", () => {
    render(<OurServices />)

    // Check for all service titles
    expect(screen.getByText("Strategic IT Consulting")).toBeInTheDocument()
    expect(screen.getByText("Custom Software Development")).toBeInTheDocument()
    expect(screen.getByText("Cloud Migration & Management")).toBeInTheDocument()
    expect(screen.getByText("Cybersecurity Solutions")).toBeInTheDocument()
    expect(screen.getByText("Data Analytics & Business Intelligence")).toBeInTheDocument()
    expect(screen.getByText("IT Infrastructure Optimization")).toBeInTheDocument()
  })

  it("renders service descriptions", () => {
    render(<OurServices />)

    // Check for some service descriptions
    expect(screen.getByText(/Align your technology investments with business goals/i)).toBeInTheDocument()
    expect(screen.getByText(/Tailored software solutions designed to address/i)).toBeInTheDocument()
    expect(screen.getByText(/Seamless transition to cloud platforms/i)).toBeInTheDocument()
  })

  it("renders icons for each service", () => {
    render(<OurServices />)

    // Count the number of service items
    const serviceItems = document.querySelectorAll(".rounded-full")
    expect(serviceItems.length).toBe(6)
  })
})
