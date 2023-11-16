<template>
  <article v-html="CHANGELOG"></article>
</template>

<script>
import CHANGELOG from '@webitel/ui-sdk/CHANGELOG.md';

export default {
  name: 'changelog',
  data: () => ({
    CHANGELOG,
  }),
};
</script>

<style scoped>

</style>
