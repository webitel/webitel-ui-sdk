<script setup>
import mdInit from 'markdown-it';
import { markdownTable } from 'markdown-table';
import { computed } from 'vue';

const md = mdInit({
  linkify: true,
});

const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
});

const result = computed(() => {
  const propsTable = props.info.props && markdownTable([
    ['Name', 'Required', 'Types', 'Default', 'Description', 'Example'],
    ...props.info.props.map(({
      name, type, required, defaultValue, description, tags,
    }) => {
      const _name = `\`${name}\``;
      const _type = `\`${type.name}\``;

      const _defaultValue = `\`${defaultValue.value}\``;

      const example = tags?.example && tags.example.map(({ description }) => `\`\`\`${description} \`\`\``);

      return [_name, required, _type, _defaultValue, description, example];
    }),
  ]);

  const eventsTable = props.info.events && markdownTable([
    ['Name', 'Params', 'Description'],
    ...props.info.events.map(({ name, params, description }) => {
      const _name = `\`${name}\``;
      return [_name, params, description];
    }),
  ]);

  const slotsTable = props.info.slots && markdownTable([
    ['Name', 'Scope', 'Description'],
    ...props.info.slots.map(({ name, scope, description }) => {
      const _name = `\`${name}\``;
      return [_name, scope, description];
    }),
  ]);

    return md.render(`### Props\n\n${propsTable}\n\n ### Events\n\n${eventsTable}\n\n ### Slots\n\n${slotsTable}`);
});
</script>

<template>
  <div v-html="result" />
</template>

<style scoped lang="scss">

</style>
