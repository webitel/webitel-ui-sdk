/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  entryPoints: ['./src/api/orval/**/*.ts'],
  theme: 'default',
  out: './src/api/orval/_docs-html',
  disableSources: true,
  exclude: ['./src/main.ts'],
  skipErrorChecking: true,
};

export default config;
