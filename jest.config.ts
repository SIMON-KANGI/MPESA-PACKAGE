import type { Config } from 'jest';
import dotenv from 'dotenv';
dotenv.config(); // Load .env for tests

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], // Only .ts files
  testPathIgnorePatterns: ['/lib/', '/node_modules/'], // Ignore compiled files
};

export default config;