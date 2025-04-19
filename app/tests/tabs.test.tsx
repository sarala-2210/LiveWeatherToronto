import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

describe("Tabs Components", () => {
  // Test basic rendering
  it("renders tabs with default value selected", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    
    // Check if first tab is active
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("data-state", "active");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("data-state", "inactive");
    
    // Check if first content is visible
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.queryByText("Content 2")).not.toBeVisible();
  });

  // Test tab switching
  it("switches tabs when clicked", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    
    // Click second tab
    fireEvent.click(screen.getByRole("tab", { name: "Tab 2" }));
    
    // Check if second tab is now active
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("data-state", "inactive");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("data-state", "active");
    
    // Check if second content is now visible
    expect(screen.queryByText("Content 1")).not.toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  // Test controlled component
  it("works as a controlled component", () => {
    const { rerender } = render(
      <Tabs value="tab1" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    
    // Check initial state
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("data-state", "active");
    
    // Update value prop
    rerender(
      <Tabs value="tab2" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    
    // Check if second tab is now active
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("data-state", "inactive");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("data-state", "active");
  });

  // Test disabled tabs
  it("disables tab when disabled prop is true", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeDisabled();
  });
});