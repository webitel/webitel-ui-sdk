import { globbySync } from 'globby';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import vueDocgenPlugin from 'vite-plugin-vue-docgen';
import { defineConfig } from 'vitepress';

const sidebarApi = globbySync('pages/webitel-ui/api/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarHowTo = globbySync('pages/docs/how-to/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarFAQ = globbySync('pages/docs/faq/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarArchitectureAndStructures = globbySync('pages/docs/architecture-and-structures/**/Readme.md', { cwd: path.resolve(__dirname, '../') });

const sidebarComponents = globbySync(
  'pages/webitel-ui/components/**/Readme.md',
  {
    cwd: path.resolve(__dirname, '../'),
    ignore: ['pages/webitel-ui/components/on-demand/**'],
  },
);
const sbLocale = globbySync('pages/webitel-ui/locale/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const onDemandSidebarComponents = globbySync('pages/webitel-ui/components/on-demand/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarEnums = globbySync('pages/webitel-ui/enums/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarModules = globbySync('pages/webitel-ui/modules/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarStore = globbySync('pages/webitel-ui/store/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarTests = globbySync('pages/webitel-ui/tests/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarValidators = globbySync('pages/webitel-ui/validators/**/Readme.md', { cwd: path.resolve(__dirname, '../') });

const sidebarTestsCookbook = globbySync('pages/docs/tests-cookbook/**/Readme.md', { cwd: path.resolve(__dirname, '../') });

const plyrIconsPath = path.resolve(__dirname, '../../src/assets/icons/plyr.svg');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Webitel UI',
  description: 'Webitel UI docs',
  base: '/webitel-ui-sdk/',
  head: [
    ['link',
      {
        rel: 'icon',
        href: 'data:image/svg+xml,<svg xmlns="%22http://www.w3.org/2000/svg%22" viewBox="%220" 0 100 100%22><text y="%22.9em%22" font-size="%2290%22">💅</text></svg>',
      }],
  ],
  lastUpdated: true,
  vite: {
    ssr: {
      noExternal: [
        '@vuelidate/core',
        'vue-multiselect',
        'webitel-sdk',
      ],
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
            src: plyrIconsPath,
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
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      { text: 'FAQ', items: sidebarFAQ },
      { text: 'Architecture, Structures, Design, etc', items: sidebarArchitectureAndStructures },
      { text: 'How To', items: sidebarHowTo },
      { text: 'API Tools', items: sidebarApi },
      { text: 'Locale', items: sbLocale },
      { text: 'Components', items: sidebarComponents },
      { text: 'Components/on-demand', items: onDemandSidebarComponents },
      { text: 'Enums', items: sidebarEnums },
      { text: 'Modules', items: sidebarModules },
      { text: 'Store', items: sidebarStore },
      { text: 'Test utils and Mocks', items: sidebarTests },
      { text: 'Validators', items: sidebarValidators },
      { text: 'Tests Cookbook', items: sidebarTestsCookbook },
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/webitel/webitel-ui-sdk' },
    ],
    // https://vitepress.dev/reference/default-theme-edit-link#site-level-config
    editLink: {
      // https://vitepress.dev/reference/runtime-api#usedata
      pattern: 'https://github.com/webitel/webitel-ui-sdk/tree/master/docs/:path',
    },
  },
});
