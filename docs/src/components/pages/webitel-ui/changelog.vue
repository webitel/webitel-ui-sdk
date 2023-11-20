<template>
  <article v-html="CHANGELOG" />
</template>

<script>
import md from 'markdown-it';
import CHANGELOG from '../../../../../CHANGELOG.md?raw';

export default {
  name: 'Changelog',
  data: () => ({
    CHANGELOG: md().render(CHANGELOG, {
      linkify: true,
    }),
  }),
};
</script>

<style scoped>

</style>
