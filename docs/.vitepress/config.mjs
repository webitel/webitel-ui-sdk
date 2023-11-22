import { globbySync } from 'globby';
import path from 'path';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import { defineConfig } from 'vitepress';

const sidebarHowTo = globbySync('pages/docs/how-to/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarComponents = globbySync('pages/webitel-ui/components/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarValidators = globbySync('pages/webitel-ui/validators/**/Readme.md', { cwd: path.resolve(__dirname, '../') });

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Webitel UI',
  description: 'Webitel UI docs',
  base: '/ui-sdk/new',
  vite: {
    ssr: {
      noExternal: [
        '@vuelidate/core',
        'vue-multiselect',
        'webitel-sdk',
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/css/main.scss";`,
        },
      },
    },
    plugins: [
      createSvgSpritePlugin({
        include: '**/sprite/*.svg',
      }),
    ],
  },

  // additionalData: `@import "../../src/css/main.scss";`,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      { text: 'How To', items: sidebarHowTo },
      { text: 'Components', items: sidebarComponents },
      { text: 'Validators', items: sidebarValidators },
    ].map(({ text, items }) => (
      {
        text,
        items: items.map(doc => {
          return {
            text: doc.split('/').at(-2), // get only folder name, where Readme.md is located
            link: '/' + doc.replace(/\.md$/, ''),
          };
        }),
      })),

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
});
