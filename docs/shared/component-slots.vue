<template>
  <article class="slots">
    <article class="docs-text">
      <h2>Slots:</h2>
    </article>
    <wt-table
      :data="slots"
      :headers="headers"
      :selectable="false"
    >
      <template #name="{ item }">
        <code>{{ item.name }}</code>
      </template>
      <template #scope="{ item }">
        <code>{{ item.scope }}</code>
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
  name: 'ComponentSlots',
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

<style lang="scss" scoped></style>
