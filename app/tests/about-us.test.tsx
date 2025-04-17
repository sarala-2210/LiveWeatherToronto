/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import AboutUs from "@/components/about-us"

describe("AboutUs Component", () => {
  it("renders the component title", () => {
    render(<AboutUs />)
    expect(screen.getByText("About Us")).toBeInTheDocument()
  })

  it("renders the company description", () => {
    render(<AboutUs />)
    expect(screen.getByText(/Company Inc. is a leading IT consulting firm/i)).toBeInTheDocument()
    expect(screen.getByText(/Founded in 2010/i)).toBeInTheDocument()
    expect(screen.getByText(/Our mission is to empower organizations/i)).toBeInTheDocument()
  })

  it("renders the core values section", () => {
    render(<AboutUs />)
    expect(screen.getByText("Our Core Values")).toBeInTheDocument()

    // Check for core values list items
    expect(screen.getByText(/Excellence in every project/i)).toBeInTheDocument()
    expect(screen.getByText(/Innovation that drives meaningful/i)).toBeInTheDocument()
    expect(screen.getByText(/Integrity in all client/i)).toBeInTheDocument()
    expect(screen.getByText(/Collaboration that fosters/i)).toBeInTheDocument()
  })
})
