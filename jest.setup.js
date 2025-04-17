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
