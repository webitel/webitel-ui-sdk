import { globbySync } from 'globby';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import vueDocgenPlugin from 'vite-plugin-vue-docgen';
import { defineConfig } from 'vitepress';
import sidebar from './sidebar.js';

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
    ssr: {
      noExternal: ['@vuelidate/core', 'vue-multiselect', 'webitel-sdk'],
    },
    plugins: [
      nodePolyfills({
        globals: {
          process: true,
        },
      }),

      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, '../../src/assets/icons/plyr.svg'),
            dest: 'img',
          },
        ],
      }),
      createSvgSpritePlugin({
        include: '**/sprite/*.svg',
      }),
      (() => {
        const docgen = vueDocgenPlugin({
          include: globbySync(['src/components/**/*.vue']),
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
    // search: { provider: 'local' },
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],
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
      pattern: 'https://github.com/webitel/webitel-ui-sdk/tree/master/docs/:path',
    },
  },
});
