module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    testMatch: ['**/*.test.ts|tsx'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
};
