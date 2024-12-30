import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import checker from 'vite-plugin-checker';
import {defineConfig, loadEnv} from 'vite';
import {nodePolyfills} from 'vite-plugin-node-polyfills';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/install.ts'),
        name: 'ui-sdk',
        // the proper extensions will be added
        fileName: 'ui-sdk',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue', '@webitel/fonts'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
          // https://github.com/vitejs/vite/issues/4863#issuecomment-1005451468
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'ui-sdk.css';
            return assetInfo.name;
          },
        },
      },
    },
    define: {
      'process.env': JSON.parse(JSON.stringify(env).replaceAll('VITE_', 'VUE_APP_')),
    },
    server: {
      // TODO REMOVE
      port: 8081,
    },
    resolve: {
      alias: {
        // vue: '@vue/compat',
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        },
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/icons/sprite/',
            dest: 'img',
          },
        ],
      }),
      // https://www.npmjs.com/package/vite-plugin-node-polyfills
      nodePolyfills({
        // are needed for csv-parse
        include: ['buffer', 'stream'],
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
        },
      }),
      createSvgSpritePlugin({
        include: '**/sprite/*.svg',
      }),
      checker({
        typescript: false,
        vueTsc: true,
        // biome: true,
      }),
    ],
    test: {
      globals: true,
      coverage: {
        enabled: false,
        reporter: 'json',
      },
      environment: 'happy-dom',
      setupFiles: ['./tests/config/config.js'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern', // or "modern-compiler", "legacy",
          sassOptions: {
            quietDeps: true,
          },
          additionalData: (content, filename) => {
            // Suppress warnings for specific files or packages
            if (/node_modules\/plyr/.test(filename)) {
              return `
              @import "plyr/src/sass/plyr.scss";
              /* suppress warnings for this file */
              $disable-import-warning: true;
            `;
            }
            return content;
          }
        },
      },
    },
  });
};
