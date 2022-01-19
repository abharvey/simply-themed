module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    testMatch: ['**/*.test.js'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
};
