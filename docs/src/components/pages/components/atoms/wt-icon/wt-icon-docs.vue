<template>
  <section>
    <h2>Icons</h2>
    <article>
      <div class="example-wrapper">
        <wt-icon icon="bucket"></wt-icon>
        <pre><code class="language-html">&lt;wt-icon icon="bucket"&gt;&lt;/wt-icon&gt;</code></pre>
      </div>
    </article>
    <h3>For wt-icon sprites installation, see:
      <router-link to="/quick-start">Quick Start</router-link>
      page
    </h3>
    <component-props
      :properties="properties"
    ></component-props>
    <icon-grid/>
    <article
      v-html="howDoesItWorkMd"
      id="how-does-it-work"
      class="markdown-body"
    ></article>
    <article
      v-html="howToInstallCustomIconsToProjectMd"
      id="how-to-install-custom-icons"
      class="markdown-body"
    ></article>
    <article
      v-html="iconsNamingConventionMd"
      id="icons-naming-convention"
      class="markdown-body"
    ></article>
    <article
      v-html="cleanupIconsMd"
      id="cleanup-icons"
      class="markdown-body"
    ></article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import IconGrid from './_internals/icon-grid.vue';

import howDoesItWorkMd from './md/how-does-it-work';
import howToInstallCustomIconsToProjectMd from './md/how-to-install-custom-icons-to-project';
import iconsNamingConventionMd from './md/icons-naming-convention';
import cleanupIconsMd from './md/cleanup-icons';

export default {
  name: 'wt-icon-docs',
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
      return howDoesItWorkMd[this.$i18n.locale] || howDoesItWorkMd.default;
    },
    howToInstallCustomIconsToProjectMd() {
      return howToInstallCustomIconsToProjectMd[this.$i18n.locale] || howToInstallCustomIconsToProjectMd.default;
    },
    iconsNamingConventionMd() {
      return iconsNamingConventionMd[this.$i18n.locale] || iconsNamingConventionMd.default;
    },
    cleanupIconsMd() {
      return cleanupIconsMd[this.$i18n.locale] || cleanupIconsMd.default;
    },
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>

</style>
