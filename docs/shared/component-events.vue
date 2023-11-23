<template>
  <article class="events">
    <article class="docs-text">
      <h2>Events: </h2>
    </article>
    <wt-table
      :data="events"
      :headers="headers"
      :selectable="false"
    >
      <template #value="{ item }">
        <code>{{ item.value }}</code>
      </template>
      <template #description="{ item }">
        <p
          v-if="item.description"
          v-html="md.render(item.description)"
        />
      </template>
    </wt-table>
  </article>
</template>

<script>
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  linkify: true,
});

export default {
  name: 'ComponentEvents',
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    md,
    headers: [
      { value: 'value', text: 'Name', width: '200px' },
      { value: 'params', text: 'Params' },
      { value: 'description', text: 'Description' },
    ],
  }),
};
</script>

<style lang="scss" scoped>

</style>
