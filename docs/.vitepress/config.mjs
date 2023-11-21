import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import { defineConfig } from 'vitepress';
import { globbySync } from 'globby';
import path from 'path';

const sidebarComponents = globbySync('pages/**/Readme.md', { cwd: path.resolve(__dirname, '../')})

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
    plugins: [
      createSvgSpritePlugin({
        include: '**/sprite/*.svg',
      }),
    ],
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
        items: sidebarComponents.map(comp => {
          return {
            text: comp.split('/').at(-2), // get only folder name, where Readme.md is located
            link: '/' + comp.replace(/\.md$/, '')
          }
        })
      }
    ]

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
