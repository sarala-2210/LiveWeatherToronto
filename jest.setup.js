// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// Mock fetch globally for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}), // You can replace this with mock data for specific tests
  }),
)

// Mock environment variables for testing purposes
process.env = {
  ...process.env,
  OPENWEATHER_API_KEY: "test-api-key", // Example: Mocking API key
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

// Mock window.matchMedia for media query testing
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

// Mock IntersectionObserver for lazy loading and intersection-related tests
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

// Mock ResizeObserver for resize events during tests
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

// Mock localStorage and sessionStorage for tests involving browser storage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

global.sessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

// Mock window.scrollTo to prevent errors related to scroll during tests
window.scrollTo = jest.fn()

// Mock console.error to suppress errors during tests (or you can add logic to check for them)
global.console.error = jest.fn()

// Optionally, you can mock MutationObserver if your tests involve DOM changes
class MockMutationObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    return null
  }
  disconnect() {
    return null
  }
}
global.MutationObserver = MockMutationObserver
