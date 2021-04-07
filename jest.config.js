module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  reporters: ['default', 'bamboo-jest-reporter'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    'src/filters/**/*.{js,vue}',
    'src/mixins/**/*.{js,vue}',
    'src/modules/**/*.{js,vue}',
    'src/scripts/**/*.{js,vue}',
    'src/store/**/*.{js,vue}',
    '!src/**/index.js', // No need to cover bootstrap file
  ],
  setupFiles: [
    './tests/config/config.js',
    './src/components/index.js',
    './src/directives/index.js',
  ],
  setupFilesAfterEnv: ['./tests/config/jest.config.js'],
};
