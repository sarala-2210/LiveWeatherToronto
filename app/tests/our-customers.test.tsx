/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import OurCustomers from "@/components/our-customers"
import { expect, describe, it } from "@jest/globals"

describe("OurCustomers Component", () => {
  it("renders the component title", () => {
    render(<OurCustomers />)
    expect(screen.getByText("Our Customers")).toBeInTheDocument()
  })

  it("renders the testimonials section", () => {
    render(<OurCustomers />)
    expect(screen.getByText("Client Testimonials")).toBeInTheDocument()

    // Check for testimonial authors
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument()
    expect(screen.getByText("Michael Chen")).toBeInTheDocument()
    expect(screen.getByText("Emily Rodriguez")).toBeInTheDocument()

    // Check for testimonial companies - use getAllByText for elements that appear multiple times
    expect(screen.getAllByText("TechNova Inc.").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Global Finance Partners").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Healthcare Solutions").length).toBeGreaterThan(0)
  })

  it("renders the clients section", () => {
    render(<OurCustomers />)
    expect(screen.getByText("Our Clients")).toBeInTheDocument()

    // Check for some client names
    expect(screen.getAllByText("TechNova Inc.").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Global Finance Partners").length).toBeGreaterThan(0)
    expect(screen.getByText("Toronto Manufacturing Group")).toBeInTheDocument()
    expect(screen.getByText("Canadian Retail Association")).toBeInTheDocument()
  })
})
