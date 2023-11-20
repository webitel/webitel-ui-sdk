<template>
  <section>
    <h2>Icons</h2>
    <article>
      <div class="example-wrapper">
        <wt-icon icon="bucket" />
        <pre><code class="language-html">&lt;wt-icon icon="bucket"&gt;&lt;/wt-icon&gt;</code></pre>
      </div>
    </article>
    <h3>
      For wt-icon sprites installation, see:
      <router-link to="/quick-start">
        Quick Start
      </router-link>
      page
    </h3>
    <component-props
      :properties="properties"
    />
    <icon-grid />
    <article
      id="how-does-it-work"
      class="markdown-body"
      v-html="howDoesItWorkMd"
    />
    <article
      id="how-to-install-custom-icons"
      class="markdown-body"
      v-html="howToInstallCustomIconsToProjectMd"
    />
    <article
      id="icons-naming-convention"
      class="markdown-body"
      v-html="iconsNamingConventionMd"
    />
    <article
      id="cleanup-icons"
      class="markdown-body"
      v-html="cleanupIconsMd"
    />
  </section>
</template>

<script>
import Prism from 'prismjs';
import md from 'markdown-it';
import IconGrid from './_internals/icon-grid.vue';

import howDoesItWorkMd from './md/how-does-it-work/how-does-it-work.en.md?raw';
import howToInstallCustomIconsToProjectMd from './md/how-to-install-custom-icons-to-project/how-to-install-custom-icons-to-project.en.md?raw';
import iconsNamingConventionMd from './md/icons-naming-convention/icons-naming-convention.en.md?raw';
import cleanupIconsMd from './md/cleanup-icons/cleanup-icons.en.md?raw';

export default {
  name: 'WtIconDocs',
  components: {
    IconGrid,
  },
  data: () => ({
    properties: [
      {
        value: 'icon',
        code: '<wt-icon icon="close"></wt-icon>',
        type: 'String',
        required: true,
      },
      {
        value: 'size',
        code: '<wt-icon icon="close" size="sm"></wt-icon>',
        type: 'String',
        options: ['sm (16px)', 'md (24px)', 'lg (32px)', 'xl (40px)'],
        default: 'md',
      },
      {
        value: 'color',
        code: '<wt-icon icon="close" color="success"></wt-icon>',
        type: 'String',
        default: 'default',
        options: [
          'default - var(--icon-color)',
          'contrast - var(--main-color)',
          'active - default icon color at :hover',
          'disabled - icon color, but with "disabled" opacity',
          'success - inherited from Semantic colors',
          'danger - inherited from Semantic colors',
          'transfer - inherited from Semantic colors',
          'hold - inherited from Semantic colors',
          'secondary-50',
        ],
        description: 'Icon colors. Attention! Hover color is changing only for "default color".',
      },
      {
        value: 'iconPrefix',
        code: '<wt-icon icon="close" icon-prefix="adm"></wt-icon>',
        type: 'String',
        default: '',
        description: `inserts icon name prefix between "icon" and actual icon name ("icon" prop).
            Useful for library icons extension with project-level icons with this prefix in name`,
      },
    ],
  }),
  computed: {
    howDoesItWorkMd() {
      return md().render(howDoesItWorkMd, { linkify: true });
    },
    howToInstallCustomIconsToProjectMd() {
      return md().render(howToInstallCustomIconsToProjectMd, { linkify: true });
    },
    iconsNamingConventionMd() {
      return md().render(iconsNamingConventionMd, { linkify: true });
    },
    cleanupIconsMd() {
      return md().render(cleanupIconsMd, { linkify: true });
    },
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>

</style>
