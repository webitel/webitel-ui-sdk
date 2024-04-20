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
const onDemandSidebarComponents = globbySync('pages/webitel-ui/components/on-demand/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarEnums = globbySync('pages/webitel-ui/enums/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarModules = globbySync('pages/webitel-ui/modules/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarTests = globbySync('pages/webitel-ui/tests/**/Readme.md', { cwd: path.resolve(__dirname, '../') });
const sidebarValidators = globbySync('pages/webitel-ui/validators/**/Readme.md', { cwd: path.resolve(__dirname, '../') });

const sidebarTestsCookbook = globbySync('pages/docs/tests-cookbook/**/Readme.md', { cwd: path.resolve(__dirname, '../') });

const plyrIconsPath = path.resolve(__dirname, '../../src/assets/icons/plyr.svg');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Webitel UI',
  description: 'Webitel UI docs',
  base: '/webitel-ui-sdk/',
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
      { text: 'API', items: sidebarApi },
      { text: 'Components', items: sidebarComponents },
      { text: 'Components/on-demand', items: onDemandSidebarComponents },
      { text: 'Enums', items: sidebarEnums },
      { text: 'Modules', items: sidebarModules },
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

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
});
