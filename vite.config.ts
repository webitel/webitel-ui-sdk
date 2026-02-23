/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { globbySync } from 'globby';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
				external: [
					'vue',
					'primevue',
					'@aliasedDeps/api-services/axios',
					'@webitel/styleguide',
					'@webitel/styleguide/fonts',
					'lodash-es',
					'zod',
					'clipboard-copy',
				],
				output: {
					// Provide global variables to use in the UMD build
					// for externalized deps
					globals: {
						vue: 'Vue',
						primevue: 'PrimeVue',
					},
				},
			},
		},
		server: {
			// host: true,  // uncomment me to enable localhost access by IP (including from other devices in the network)
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
						isCustomElement: (tag) => tag.startsWith('media-'),
					},
				},
			}),
			// viteStaticCopy({
			//   targets: [
			//     {
			//       src: 'src/assets/icons/sprite/',
			//       dest: 'img',
			//     },
			//   ],
			// }),
			// https://www.npmjs.com/package/vite-plugin-node-polyfills
			nodePolyfills({
				// are needed for csv-parse
				include: [
					'buffer',
					'stream',
				],
				globals: {
					Buffer: true, // can also be 'build', 'dev', or false
				},
			}),
			checker({
				typescript: false,
				vueTsc: false,
				// biome: true,
			}),

			AutoImport({
				include: [
					...globbySync('*.{ts,js,vue}'),
				],
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
					'vue-i18n': [
						'useI18n',
					],
					'vue-router': [
						'useRouter',
						'useRoute',
					],
				},
			}),
		],
		test: {
			globals: true,
			environment: 'happy-dom',
			setupFiles: [
				'./tests/config/config.js',
			],
		},
	});
};
