module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    // '!src/main.js', // No need to cover bootstrap file
  ],
  setupFiles: [
    './tests/config/config.js',
    './src/components/index.js',
    './src/directives/index.js',
  ],
  setupFilesAfterEnv: ['./tests/config/jest.config.js'],
};
