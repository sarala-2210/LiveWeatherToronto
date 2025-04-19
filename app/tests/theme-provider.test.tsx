/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react"
import { ThemeProvider } from "@/components/theme-provider"
import { expect, describe, it, jest } from "@jest/globals"

// Mock next-themes
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="mock-theme-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}))

describe("ThemeProvider Component", () => {
  it("renders children and passes props to next-themes provider", () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div>Test Child</div>
      </ThemeProvider>,
    )

    // Check if children are rendered
    expect(getByText("Test Child")).toBeInTheDocument()

    // Check if props are passed correctly
    const mockProvider = getByTestId("mock-theme-provider")
    const passedProps = JSON.parse(mockProvider.getAttribute("data-props") || "{}")

    expect(passedProps.attribute).toBe("class")
    expect(passedProps.defaultTheme).toBe("light")
    expect(passedProps.enableSystem).toBe(true)
  })
})
