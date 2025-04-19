/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import { expect, describe, it } from "@jest/globals"

// Test utility functions
describe("Utility Functions", () => {
  // Test date formatting
  it("formats dates correctly", () => {
    // Create a fixed date for testing
    const testDate = new Date("2023-05-15T14:30:00Z")

    // Test ISO string format - use a regex that matches the general format
    expect(testDate.toISOString()).toMatch(/2023-05-15T\d{2}:30:00/)

    // Test locale date string format
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }

    // This will vary by environment, but we can test the basic structure
    const formattedDate = testDate.toLocaleString("en-CA", options as Intl.DateTimeFormatOptions)
    expect(formattedDate).toContain("2023")
    expect(formattedDate).toContain("05")
    expect(formattedDate).toContain("15")
  })

  // Test DOM utilities
  it("renders and queries DOM elements correctly", () => {
    // Render a test component
    render(
      <div data-testid="test-container">
        <h1>Test Heading</h1>
        <p className="test-paragraph">Test paragraph</p>
      </div>,
    )

    // Test querying by text
    expect(screen.getByText("Test Heading")).toBeInTheDocument()

    // Test querying by test ID
    expect(screen.getByTestId("test-container")).toBeInTheDocument()

    // Test querying by role
    expect(screen.getByRole("heading", { name: "Test Heading" })).toBeInTheDocument()
  })
})
