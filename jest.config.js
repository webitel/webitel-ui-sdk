module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/config/config.js', './src/components/index.js'],
  setupFilesAfterEnv: ['./tests/config/jest.config.js'],
};
