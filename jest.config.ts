
import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  coverageDirectory: "coverage",
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/__test__/modules/**/useCases/**/*.ts'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coverageProvider: 'v8'
};

export default config;
