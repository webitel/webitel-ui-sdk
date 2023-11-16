<template>
  <p class="md" v-html="md">
  </p>
</template>

<script>
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  linkify: true,
});

export default {
  name: 'md-component',
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    md() {
      return md.render(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.md :deep(a) {
  color: revert;
}
</style>
