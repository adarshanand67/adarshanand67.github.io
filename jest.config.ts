import type { Config } from 'jest';
import nextJest from 'next/jest';
const createJestConfig = nextJest({
    dir: './',
});
const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    collectCoverageFrom: [
        'components*.{js,jsx,ts,tsx}',
        'lib*.{js,jsx,ts,tsx}',
        '!**node_modules.next__tests__*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
};
export default createJestConfig(config);
