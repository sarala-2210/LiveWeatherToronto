// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// Mock fetch globally
global.fetch = jest.fn()

// Mock environment variables
process.env = {
  ...process.env,
  OPENWEATHER_API_KEY: "test-api-key",
}
