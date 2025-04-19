"use client"

/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { expect, describe, it, jest } from "@jest/globals"

describe("UI Components", () => {
  describe("Button Component", () => {
    it("renders correctly with default props", () => {
      render(<Button>Click Me</Button>)
      const button = screen.getByRole("button", { name: "Click Me" })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass("inline-flex")
    })

    it("handles click events", () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click Me</Button>)

      const button = screen.getByRole("button", { name: "Click Me" })
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("renders with different variants", () => {
      render(
        <>
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </>,
      )

      expect(screen.getByRole("button", { name: "Default" })).toHaveClass("bg-primary")
      expect(screen.getByRole("button", { name: "Destructive" })).toHaveClass("bg-destructive")
      expect(screen.getByRole("button", { name: "Outline" })).toHaveClass("border")
      expect(screen.getByRole("button", { name: "Ghost" })).toHaveClass("hover:bg-accent")
    })
  })

  describe("Card Component", () => {
    it("renders card with content", () => {
      render(
        <Card>
          <CardTitle>Card Title</CardTitle>
          <CardContent>Card Content</CardContent>
        </Card>,
      )

      expect(screen.getByText("Card Title")).toBeInTheDocument()
      expect(screen.getByText("Card Content")).toBeInTheDocument()
    })
  })

  describe("Tabs Component", () => {
    it("renders tabs and switches between content", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>,
      )

      // First tab should be active by default
      expect(screen.getByText("Content 1")).toBeVisible()

      // Second tab content should not be visible initially
      const tab2Content = screen.queryByText("Content 2")
      expect(tab2Content).not.toBeVisible()

      // Click second tab
      fireEvent.click(screen.getByRole("tab", { name: "Tab 2" }))

      // Second tab content should now be visible
      expect(screen.getByText("Content 2")).toBeVisible()

      // First tab content should not be visible now
      expect(screen.queryByText("Content 1")).not.toBeVisible()
    })
  })
})
