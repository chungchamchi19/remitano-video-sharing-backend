import type { Config } from "@jest/types";
import { loadEnvConfig } from "./src/configs/env";

loadEnvConfig();

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/tests/setup.ts"],
  testSequencer: "./src/tests/sequence.js",
  // verbose: true,
  // automock: true,
  testPathIgnorePatterns: ["/__tests__/fake/", "/node_modules/", "/build/"],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 85,
      lines: 80,
      statements: 80,
    },
    "./src/modules/": {
      branches: 70,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
export default config;
