import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
const resolve = require('path').resolve;

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/install.js'),
        name: 'ui-sdk',
        // the proper extensions will be added
        fileName: 'ui-sdk',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    define: {
      'process.env': JSON.parse(JSON.stringify(env)
      .replaceAll('VITE_', 'VUE_APP_')),
    },
    server: {
      port: 8080,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/css/main.scss";`,
        },
      },
    },
    resolve: {
      alias: {
        vue: '@vue/compat',
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
    test: {
      globals: true,
      coverage: {
        enabled: true,
        reporter: 'json',
      },
      environment: 'happy-dom',
      setupFiles: ['./tests/config/config.js'],
    },
  });
}
