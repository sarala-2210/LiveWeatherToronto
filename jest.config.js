const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom", // This is the default value, so it's optional to specify it
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1", // If you are using @/pages
    "^@/styles/(.*)$": "<rootDir>/styles/$1", // If you are using @/styles
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "!app/api/debug*/route.ts", // Exclude debug endpoints
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      lines: 50,
      statements: 50,
      functions: 50,
      branches: 40,
    },
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

// Create Jest config to load the Next.js config and async configuration
module.exports = createJestConfig(customJestConfig);
