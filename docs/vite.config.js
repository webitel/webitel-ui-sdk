import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: '/ui-sdk',
    define: {
      'process.env': JSON.parse(JSON.stringify(env)
      .replaceAll('VITE_', 'VUE_APP_')),
    },
    server: {
      port: 8080,
      fs: {
        allow: ['..'],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/css/main.scss";`,
        },
      },
    },
    assetsInclude: ['**/*.md'],

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
    ],
  });
}
