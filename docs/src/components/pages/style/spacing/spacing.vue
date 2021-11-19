<template>
  <section class="spacing">
    <h2>Spacing</h2>
    <article
      v-html="generalMd"
      id="general"
      class="markdown-body"
    ></article>
    <article
      v-html="layoutsMd"
      id="layouts"
      class="markdown-body"
    ></article>
  </section>
</template>

<script>
import generalMd from './md/general';
import layoutsMd from './md/layouts';

export default {
  name: 'spacing',
  computed: {
    generalMd() {
      return generalMd[this.$i18n.locale] || generalMd.default;
    },
    layoutsMd() {
      return layoutsMd[this.$i18n.locale] || layoutsMd.default;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
