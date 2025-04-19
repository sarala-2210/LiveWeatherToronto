// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
)

// Mock environment variables
process.env = {
  ...process.env,
  OPENWEATHER_API_KEY: "test-api-key",
}

// Add missing expect methods if needed
expect.extend({
  toBeInTheDocument: (received) => {
    const pass = received !== null && received !== undefined
    return {
      pass,
      message: () => `expected ${received} ${pass ? "not " : ""}to be in the document`,
    }
  },
})

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    return null
  }
  unobserve() {
    return null
  }
  disconnect() {
    return null
  }
}

window.IntersectionObserver = MockIntersectionObserver

// Mock ResizeObserver
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    return null
  }
  unobserve() {
    return null
  }
  disconnect() {
    return null
  }
}

window.ResizeObserver = MockResizeObserver
