/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  entryPoints: ['./src/gen/**/*.ts'],
  disableSources: true,
  skipErrorChecking: true,
  plugin: ['typedoc-plugin-markdown', 'typedoc-github-wiki-theme'],
  outputs: [
    {
      name: 'html',
      path: './src/gen/_docs/html',
      theme: 'default',
      // options: {
      //   navigation: {
      //     includeCategories: true,
      //     includeGroups: true,
      //     excludeReferences: false,
      //     includeFolders: true,
      //   },
      // },
    },
    // {
    //   name: 'markdown',
    //   path: './src/gen/_docs/md',
    //   theme: 'github-wiki'
    // }
  ],
};

export default config;
