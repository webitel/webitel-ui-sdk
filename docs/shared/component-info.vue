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

const calcDefaultValue = (defaultValue) => {
  console.info(defaultValue);

  if (!defaultValue) {
    return ' - ';
  }

  if (typeof defaultValue.value === 'function') {
    return defaultValue.value();
  }

  // try {
  //   return JSON.parse(defaultValue.value);
  // } catch {
  if (defaultValue.value.includes('\n')) {
    return `\`${defaultValue.value.replaceAll('\n', '')}\``;
  }
  return `\`${defaultValue.value}\``;
  // }
};

const result = computed(() => {
  const propsTable =
    !!props.info?.props &&
    markdownTable([
      [
        'Name',
        'Required',
        'Types',
        'Default',
        'Description',
        'Example',
        'Deprecated',
      ],
      ...props.info.props.map(
        ({ name, type, required, defaultValue, description, tags }) => {
          const _name = `\`${name}\``;
          const _type = `\`${type.name.split('|')}\``;

          const _defaultValue = calcDefaultValue(defaultValue);

          const example =
            tags?.example &&
            tags.example.map(
              ({ description }) => `\`\`\`${description} \`\`\``,
            );

          const deprecated = !!tags?.deprecated ? '❗️' : '';

          const _required = required ? '✅' : '';

          return [
            _name,
            _required,
            _type,
            _defaultValue,
            description,
            example,
            deprecated,
          ];
        },
      ),
    ]);

  const eventsTable =
    !!props.info?.events &&
    markdownTable([
      ['Name', 'Params', 'Description'],
      ...props.info.events.map(({ name, params, description }) => {
        const _name = `\`${name}\``;
        return [_name, params, description];
      }),
    ]);

  const slotsTable =
    !!props.info?.slots &&
    markdownTable([
      ['Name', 'Scope', 'Description'],
      ...props.info.slots.map(({ name, tags, scoped, description }) => {
        const _name = `\`${name}\``;

        const scope = tags?.scope?.reduce((md, { description }) => {
          return `${md} ${description}`;
        }, '');
        return [_name, scope, description];
      }),
    ]);

  const mdResult = [
    { heading: 'Props', data: propsTable },
    { heading: 'Events', data: eventsTable },
    { heading: 'Slots', data: slotsTable },
  ]
    .filter(({ data: v }) => !!v)
    .reduce((md, { heading, data }) => {
      return `${md} ### ${heading} \n\n${data} \n\n`;
    }, '');

  return md.render(mdResult);
});
</script>

<template>
  <div v-html="result" />
</template>

<style lang="scss" scoped></style>
