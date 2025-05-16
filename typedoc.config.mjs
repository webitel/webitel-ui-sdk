/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  entryPoints: ['./src/api/orval/**/*.ts'],
  theme: 'html',
  out: './src/api/orval/_docs',
  disableSources: true,
  exclude: ['./src/main.ts'],
  skipErrorChecking: true,
  plugin: ['typedoc-plugin-markdown', 'typedoc-github-wiki-theme'],
};

export default config;
