/**
 * @jest-environment node
 */

import { GET } from "@/app/api/env-check/route"
import { describe, beforeEach, it, expect, jest, afterAll } from "@jest/globals"

describe("Environment Check API Route", () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it("returns API key status when key is present", async () => {
    // Set up test environment
    process.env.OPENWEATHER_API_KEY = "test-api-key"

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.hasApiKey).toBe(true)
    expect(data.keyStatus).toBe("Set")
  })

  it("returns API key status when key is absent", async () => {
    // Remove API key
    delete process.env.OPENWEATHER_API_KEY

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.hasApiKey).toBe(false)
    expect(data.keyStatus).toBe("Not set")
  })
})
