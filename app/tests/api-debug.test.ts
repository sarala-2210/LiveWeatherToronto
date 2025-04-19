/**
 * @jest-environment node
 */

import { GET } from "@/app/api/debug/route"
import { describe, beforeEach, it, expect, jest } from "@jest/globals"

describe("Debug API Route", () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it("returns debug information with API key present", async () => {
    // Set up test environment
    process.env.OPENWEATHER_API_KEY = "test-api-key-12345"
    process.env.NODE_ENV = "test"

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.hasApiKey).toBe(true)
    expect(data.apiKeyPrefix).toBe("test...")
    expect(data.environment).toBe("test")
  })

  it("returns debug information with API key absent", async () => {
    // Remove API key
    delete process.env.OPENWEATHER_API_KEY
    process.env.NODE_ENV = "production"

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.hasApiKey).toBe(false)
    expect(data.apiKeyPrefix).toBe("not set")
    expect(data.environment).toBe("production")
  })
})
