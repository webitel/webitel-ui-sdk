/// <reference types="vitest/config" />
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { globbySync } from 'globby';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vitejs.dev/config/
export default (/*{ mode }*/) => {
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
        external: ['vue', 'primevue', '@aliasedDeps/api-services/axios'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
            primevue: 'PrimeVue',
          },
          // https://github.com/vitejs/vite/issues/4863#issuecomment-1005451468
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'ui-sdk.css';
            return assetInfo.name;
          },
        },
      },
    },
    server: {
      port: 8080,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern-compiler", "legacy",
        },
      },
    },
    resolve: {
      alias: {
        // vue: '@vue/compat',
      },
    },
    plugins: [
      tailwindcss(),
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
        vueTsc: false,
        // biome: true,
      }),

      AutoImport({
        include: [...globbySync('*.{ts,js,vue}')],
        imports: {
          vue: [
            'ref',
            'reactive',
            'computed',
            'watch',
            'watchEffect',
            'onMounted',
            'onUnmounted',
          ],
          'vue-i18n': ['useI18n'],
          'vue-router': ['useRouter', 'useRoute'],
        },
      }),

      Components({
        resolvers: [PrimeVueResolver()],
      }),
    ],
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: ['./tests/config/config.js'],
    },
  });
};
