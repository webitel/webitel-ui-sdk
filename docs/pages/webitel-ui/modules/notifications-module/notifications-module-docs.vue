<template>
  <section class="modules">
    <article
      class="markdown-body"
      v-html="md"
    />
  </section>
</template>

<script>
import Prism from 'prismjs';

import notificationsMd from './md';

export default {
  name: 'NotificationsModuleDocs',
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

<style scoped></style>
