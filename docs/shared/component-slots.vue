<template>
  <article class="slots">
    <article class="docs-text">
      <h2>Slots: </h2>
    </article>
    <wt-table
      :data="slots"
      :headers="headers"
      :selectable="false"
    >
      <template v-slot:name="{ item }">
        <code class="language-javascript">{{ item.name }}</code>
      </template>
      <template v-slot:scope="{ item }">
        <code class="language-markup">{{ item.scope }}</code>
      </template>
      <template v-slot:description="{ item }">
        <p
          v-if="item.description"
          v-html="md.render(item.description)"
        ></p>
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
  name: 'component-slots',
  props: {
    slots: {
      type: Array,
      default: () => [
        {
          name: 'default',
          description: 'Default content slot',
        },
      ],
    },
  },
  data: () => ({
    md,
    headers: [
      { value: 'name', text: 'Name', width: '200px' },
      { value: 'scope', text: 'Scope' },
      { value: 'description', text: 'Description' },
    ],
  }),
};
</script>

<style lang="scss" scoped>

</style>
