<template>
  <article v-html="CHANGELOG"></article>
</template>

<script>
import CHANGELOG from '../../../CHANGELOG.md';

export default {
  name: 'changelog',
  data: () => ({
    CHANGELOG,
  }),
};
</script>

<style scoped>

</style>