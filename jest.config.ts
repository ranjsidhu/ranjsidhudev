import type { Config } from "jest";
import nextJest from "next/jest.js";

// next/jest compiles TypeScript with SWC, maps the @/ path alias from
// tsconfig, and loads .env files. Each test picks its environment with a
// @jest-environment docblock; the default is node.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["<rootDir>/__tests__/**/*.test.{ts,tsx}"],
  // Lets jest.mock() resolve the same @/ alias that imports use.
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  modulePathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/run-1/"],
  clearMocks: true,
  restoreMocks: true,
  // Static route pages under app/(pages) are excluded. The contact form
  // component and server action are listed explicitly because they hold logic.
  collectCoverageFrom: [
    "app/*.{ts,tsx}",
    "app/api/**/*.{ts,tsx}",
    "app/\\(pages\\)/contact/Contact.tsx",
    "app/\\(pages\\)/contact/serveractions.ts",
    "components/**/*.{ts,tsx}",
    "constants/**/*.ts",
    "hooks/**/*.ts",
    "lib/**/*.ts",
    "!**/*.d.ts",
  ],
};

export default createJestConfig(config);
