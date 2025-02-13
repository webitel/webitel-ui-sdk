// vite.config.ts
import vue from "file:///home/tanya/projects/webitel-ui-sdk/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { defineConfig, loadEnv } from "file:///home/tanya/projects/webitel-ui-sdk/node_modules/vite/dist/node/index.js";
import checker from "file:///home/tanya/projects/webitel-ui-sdk/node_modules/vite-plugin-checker/dist/esm/main.js";
import { nodePolyfills } from "file:///home/tanya/projects/webitel-ui-sdk/node_modules/vite-plugin-node-polyfills/dist/index.js";
import { viteStaticCopy } from "file:///home/tanya/projects/webitel-ui-sdk/node_modules/vite-plugin-static-copy/dist/index.js";
import createSvgSpritePlugin from "file:///home/tanya/projects/webitel-ui-sdk/node_modules/vite-plugin-svg-sprite/esm/index.js";
var __vite_injected_original_dirname = "/home/tanya/projects/webitel-ui-sdk";
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__vite_injected_original_dirname, "src/install.ts"),
        name: "ui-sdk",
        // the proper extensions will be added
        fileName: "ui-sdk"
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: "Vue"
          },
          // https://github.com/vitejs/vite/issues/4863#issuecomment-1005451468
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "ui-sdk.css";
            return assetInfo.name;
          }
        }
      }
    },
    define: {
      "process.env": JSON.parse(
        JSON.stringify(env).replaceAll("VITE_", "VUE_APP_")
      )
    },
    server: {
      port: 8080
    },
    resolve: {
      alias: {
        // vue: '@vue/compat',
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      }),
      viteStaticCopy({
        targets: [
          {
            src: "src/assets/icons/sprite/",
            dest: "img"
          }
        ]
      }),
      // https://www.npmjs.com/package/vite-plugin-node-polyfills
      nodePolyfills({
        // are needed for csv-parse
        include: ["buffer", "stream"],
        globals: {
          Buffer: true
          // can also be 'build', 'dev', or false
        }
      }),
      createSvgSpritePlugin({
        include: "**/sprite/*.svg"
      }),
      checker({
        typescript: false,
        vueTsc: mode !== "production"
        // biome: true,
      })
    ],
    test: {
      globals: true,
      coverage: {
        enabled: false,
        reporter: "json"
      },
      environment: "happy-dom",
      setupFiles: ["./tests/config/config.js"]
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
          // or "modern-compiler", "legacy",
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS90YW55YS9wcm9qZWN0cy93ZWJpdGVsLXVpLXNka1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdGFueWEvcHJvamVjdHMvd2ViaXRlbC11aS1zZGsvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdGFueWEvcHJvamVjdHMvd2ViaXRlbC11aS1zZGsvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBjaGVja2VyIGZyb20gJ3ZpdGUtcGx1Z2luLWNoZWNrZXInO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzJztcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSAndml0ZS1wbHVnaW4tc3RhdGljLWNvcHknO1xuaW1wb3J0IGNyZWF0ZVN2Z1Nwcml0ZVBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zdmctc3ByaXRlJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcblxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBidWlsZDoge1xuICAgICAgbGliOiB7XG4gICAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50c1xuICAgICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5zdGFsbC50cycpLFxuICAgICAgICBuYW1lOiAndWktc2RrJyxcbiAgICAgICAgLy8gdGhlIHByb3BlciBleHRlbnNpb25zIHdpbGwgYmUgYWRkZWRcbiAgICAgICAgZmlsZU5hbWU6ICd1aS1zZGsnLFxuICAgICAgfSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuICAgICAgICAvLyBpbnRvIHlvdXIgbGlicmFyeVxuICAgICAgICBleHRlcm5hbDogWyd2dWUnXSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXG4gICAgICAgICAgLy8gZm9yIGV4dGVybmFsaXplZCBkZXBzXG4gICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvNDg2MyNpc3N1ZWNvbW1lbnQtMTAwNTQ1MTQ2OFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgPT09ICdzdHlsZS5jc3MnKSByZXR1cm4gJ3VpLXNkay5jc3MnO1xuICAgICAgICAgICAgcmV0dXJuIGFzc2V0SW5mby5uYW1lO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICAncHJvY2Vzcy5lbnYnOiBKU09OLnBhcnNlKFxuICAgICAgICBKU09OLnN0cmluZ2lmeShlbnYpLnJlcGxhY2VBbGwoJ1ZJVEVfJywgJ1ZVRV9BUFBfJyksXG4gICAgICApLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA4MDgwLFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgLy8gdnVlOiAnQHZ1ZS9jb21wYXQnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSh7XG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICBjb21wYXRDb25maWc6IHtcbiAgICAgICAgICAgICAgTU9ERTogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnc3JjL2Fzc2V0cy9pY29ucy9zcHJpdGUvJyxcbiAgICAgICAgICAgIGRlc3Q6ICdpbWcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzXG4gICAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgICAgLy8gYXJlIG5lZWRlZCBmb3IgY3N2LXBhcnNlXG4gICAgICAgIGluY2x1ZGU6IFsnYnVmZmVyJywgJ3N0cmVhbSddLFxuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgQnVmZmVyOiB0cnVlLCAvLyBjYW4gYWxzbyBiZSAnYnVpbGQnLCAnZGV2Jywgb3IgZmFsc2VcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgY3JlYXRlU3ZnU3ByaXRlUGx1Z2luKHtcbiAgICAgICAgaW5jbHVkZTogJyoqL3Nwcml0ZS8qLnN2ZycsXG4gICAgICB9KSxcbiAgICAgIGNoZWNrZXIoe1xuICAgICAgICB0eXBlc2NyaXB0OiBmYWxzZSxcbiAgICAgICAgdnVlVHNjOiBtb2RlICE9PSAncHJvZHVjdGlvbicsXG4gICAgICAgIC8vIGJpb21lOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB0ZXN0OiB7XG4gICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgY292ZXJhZ2U6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIHJlcG9ydGVyOiAnanNvbicsXG4gICAgICB9LFxuICAgICAgZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxuICAgICAgc2V0dXBGaWxlczogWycuL3Rlc3RzL2NvbmZpZy9jb25maWcuanMnXSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJywgLy8gb3IgXCJtb2Rlcm4tY29tcGlsZXJcIiwgXCJsZWdhY3lcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixPQUFPLFNBQVM7QUFDM1MsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sYUFBYTtBQUNwQixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLHNCQUFzQjtBQUMvQixPQUFPLDJCQUEyQjtBQU5sQyxJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDM0IsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFNBQU8sYUFBYTtBQUFBLElBQ2xCLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQTtBQUFBLFFBRUgsT0FBTyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLFFBQzFDLE1BQU07QUFBQTtBQUFBLFFBRU4sVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBLGVBQWU7QUFBQTtBQUFBO0FBQUEsUUFHYixVQUFVLENBQUMsS0FBSztBQUFBLFFBQ2hCLFFBQVE7QUFBQTtBQUFBO0FBQUEsVUFHTixTQUFTO0FBQUEsWUFDUCxLQUFLO0FBQUEsVUFDUDtBQUFBO0FBQUEsVUFFQSxnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGdCQUFJLFVBQVUsU0FBUyxZQUFhLFFBQU87QUFDM0MsbUJBQU8sVUFBVTtBQUFBLFVBQ25CO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixlQUFlLEtBQUs7QUFBQSxRQUNsQixLQUFLLFVBQVUsR0FBRyxFQUFFLFdBQVcsU0FBUyxVQUFVO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUEsTUFFUDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxRQUNGLFVBQVU7QUFBQSxVQUNSLGlCQUFpQjtBQUFBLFlBQ2YsY0FBYztBQUFBLGNBQ1osTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsZUFBZTtBQUFBLFFBQ2IsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBO0FBQUEsTUFFRCxjQUFjO0FBQUE7QUFBQSxRQUVaLFNBQVMsQ0FBQyxVQUFVLFFBQVE7QUFBQSxRQUM1QixTQUFTO0FBQUEsVUFDUCxRQUFRO0FBQUE7QUFBQSxRQUNWO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxzQkFBc0I7QUFBQSxRQUNwQixTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQUEsTUFDRCxRQUFRO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixRQUFRLFNBQVM7QUFBQTtBQUFBLE1BRW5CLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxVQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0EsYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLDBCQUEwQjtBQUFBLElBQ3pDO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixLQUFLO0FBQUE7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
