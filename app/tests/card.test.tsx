import { render, screen } from "@testing-library/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

describe("Card Components", () => {
  // Test Card rendering
  it("renders Card with className", () => {
    render(<Card className="test-class">Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
    expect(screen.getByText("Card Content").parentElement).toHaveClass("test-class");
  });

  // Test CardHeader
  it("renders CardHeader correctly", () => {
    render(<CardHeader className="header-class">Header Content</CardHeader>);
    expect(screen.getByText("Header Content")).toBeInTheDocument();
    expect(screen.getByText("Header Content").parentElement).toHaveClass("header-class");
  });

  // Test CardTitle
  it("renders CardTitle correctly", () => {
    render(<CardTitle className="title-class">Card Title</CardTitle>);
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Title")).toHaveClass("title-class");
  });

  // Test CardDescription
  it("renders CardDescription correctly", () => {
    render(<CardDescription className="desc-class">Card Description</CardDescription>);
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toHaveClass("desc-class");
  });

  // Test CardContent
  it("renders CardContent correctly", () => {
    render(<CardContent className="content-class">Content</CardContent>);
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Content").parentElement).toHaveClass("content-class");
  });

  // Test CardFooter
  it("renders CardFooter correctly", () => {
    render(<CardFooter className="footer-class">Footer Content</CardFooter>);
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Content").parentElement).toHaveClass("footer-class");
  });

  // Test complete Card composition
  it("renders a complete Card with all subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Test Footer")).toBeInTheDocument();
  });
});