/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  entryPoints: ['./src/gen/**/*.ts'],
  theme: 'html',
  out: './src/gen/_docs',
  disableSources: true,
  skipErrorChecking: true,
  plugin: ['typedoc-plugin-markdown', 'typedoc-github-wiki-theme'],
};

export default config;
