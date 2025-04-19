/**
 * @jest-environment node
 */

import { GET } from "@/app/api/debug-env/route"
import { describe, beforeEach, it, expect, jest, afterAll } from "@jest/globals"

describe("Debug Environment API Route", () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    jest.resetModules()
    // Create a copy of the environment
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    // Restore original environment
    process.env = { ...originalEnv }
  })

  it("returns environment information with API key present", async () => {
    // Set up test environment
    process.env.OPENWEATHER_API_KEY = "test-api-key-12345"
    process.env.NODE_ENV = "test"
    process.env.VERCEL_ENV = "development"

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.hasApiKey).toBe(true)
    expect(data.apiKeyFirstChars).toBe("test...")
    expect(data.apiKeyLength).toBe(18) // Length of "test-api-key-12345"
    expect(data.environment).toBe("test")
    expect(data.vercelEnv).toBe("development")
    expect(data.nodeVersion).toBeDefined()
  })

  it("returns environment information with API key absent", async () => {
    // Remove API key
    delete process.env.OPENWEATHER_API_KEY

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.hasApiKey).toBe(false)
    expect(data.apiKeyFirstChars).toBe("not set")
    expect(data.apiKeyLength).toBe(0)
  })

  it("handles errors gracefully", async () => {
    // Mock JSON.stringify to throw an error
    const originalStringify = JSON.stringify
    global.JSON.stringify = jest.fn().mockImplementation(() => {
      throw new Error("Test error")
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe("Error checking environment")
    expect(data.message).toBe("Test error")

    // Restore JSON.stringify
    global.JSON.stringify = originalStringify
  })
})
