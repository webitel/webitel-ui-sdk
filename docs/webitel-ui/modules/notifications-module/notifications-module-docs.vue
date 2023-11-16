<template>
  <section class="modules">
    <article
      v-html="md"
      class="markdown-body"
    ></article>
  </section>
</template>

<script>
import Prism from 'prismjs';
import notificationsMd from './md';

export default {
  name: 'notifications-module-docs',
  computed: {
    md() {
      return notificationsMd[this.$i18n.locale] || notificationsMd.default;
    },
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style scoped>

</style>
