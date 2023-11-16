import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Webitel UI",
  description: "Webitel UI docs",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/css/main.scss";`,
        },
      },
    },
  },

  // additionalData: `@import "../../src/css/main.scss";`,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'wt-input', link: '/webitel-ui/components/wt-input/wt-input' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    //
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
