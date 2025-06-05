import { globbySync } from 'globby';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import vueDocgenPlugin from 'vite-plugin-vue-docgen';
import { defineConfig } from 'vitepress';
import tailwindcss from '@tailwindcss/vite';
import { nav, sidebar } from './routes.js';
import { Window } from 'happy-dom';

global.localStorage = new Window().localStorage; // coz vitepress ssr doesn't have localStorage

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Webitel UI',
  description: 'Webitel UI docs',
  base: '/webitel-ui-sdk/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'data:image/svg+xml,<svg xmlns="%22http://www.w3.org/2000/svg%22" viewBox="%220" 0 100 100%22><text y="%22.9em%22" font-size="%2290%22">💅</text></svg>',
      },
    ],
  ],
  lastUpdated: true,
  vite: {
    resolve: {
      alias: [
        { find: '__lib__', replacement: path.resolve(__dirname, '../../src') },
      ],
    },
    ssr: {
      noExternal: ['@vuelidate/core', 'vue-multiselect', 'webitel-sdk'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern', // or "modern-compiler", "legacy",
        },
      },
    },
    plugins: [
      nodePolyfills({
        globals: {
          process: true,
        },
      }),
      createSvgSpritePlugin({
        include: '**/sprite/*.svg',
      }),
      tailwindcss(),
      (() => {
        const docgen = vueDocgenPlugin({
          include: globbySync(['src/**/*.vue']),
          injectAt: 'docs',
        });
        // dunno why, but default enforce value breaks build
        docgen.enforce = null;
        return docgen;
      })(),
    ],
  },

  // additionalData: `@import "../../src/css/main.scss";`,
  themeConfig: {
    // search won't work till i18n locales are "legacy: false"
    search: { provider: 'local' },
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/webitel/webitel-ui-sdk',
      },
    ],
    // https://vitepress.dev/reference/default-theme-edit-link#site-level-config
    editLink: {
      // https://vitepress.dev/reference/runtime-api#usedata
      pattern:
        'https://github.com/webitel/webitel-ui-sdk/tree/master/docs/:path',
    },
  },
});
