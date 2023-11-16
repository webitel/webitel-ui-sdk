<template>
  <section class="colors">
    <h2 class="colors-family-title">Main Colors</h2>
    <article
      class="colors-family"
      v-for="({ title, colors }, key) of mainColors"
      :key="key"
    >
      <h3 class="color-title">{{ title }}</h3>
      <wt-table
        :headers="headers"
        :data="colors"
        :selectable="false"
        :grid-actions="false"
      >
        <template v-slot:code="{ item }">
          {{ w.getComputedStyle(w.document.documentElement).getPropertyValue(item.color) }}
        </template>
        <template v-slot:preview="{ item }">
          <div class="color-preview" :style="{background: `var(${item.color})`}"></div>
        </template>
      </wt-table>
    </article>

    <h2>Palette</h2>
    <article
      class="colors-family"
      v-for="({ title, colors }, key) of palette"
      :key="key"
    >
      <h3 class="color-title">{{ title }}</h3>
      <wt-table
        :headers="headers"
        :data="colors"
        :selectable="false"
        :grid-actions="false"
      >
        <template v-slot:code="{ item }">
          {{ w.getComputedStyle(w.document.documentElement).getPropertyValue(item.color) }}
        </template>
        <template v-slot:preview="{ item }">
          <div class="color-preview" :style="{background: `var(${item.color})`}"></div>
        </template>
      </wt-table>
    </article>
  </section>
</template>

<script setup>
const w = window;

const headers = [
  { value: 'name', text: 'Name' },
  { value: 'color', text: 'Variable' },
  { value: 'code', text: 'Code' },
  { value: 'preview', text: 'Preview' },
];

const mainColors = [
  {
    title: 'Main colors',
    colors: [
      {

        color: '--accent-color',
        name: 'Accent color',
      },
      {

        color: '--main-color',
        name: 'Main color',
      },
      {

        color: '--contrast-color',
        name: 'Contrast color',
      },
      {

        color: '--secondary-color',
        name: 'Secondary color',
      },
      {

        color: '--secondary-color-50',
        name: 'Secondary color 50',
      },
      {

        color: '--page-bg-color',
        name: 'Page background color',
      },
      {

        color: '--header-color',
        name: 'Header color',
      },
      {

        color: '--accent-secondary-color',
        name: 'Accent secondary color',
      },
    ],
  },
  {
    title: 'Semantic colors',
    colors: [
      {

        color: '--disabled-color',
        name: 'Disabled color',
      },
      {

        color: '--true-color',
        name: 'True color',
      },
      {

        color: '--true--hover-color',
        name: 'True hover color',
      },
      {

        color: '--false-color',
        name: 'False color',
      },
      {

        color: '--false--hover-color',
        name: 'False hover color',
      },
      {

        color: '--hold-color',
        name: 'Hold color',
      },
      {

        color: '--hold--hover-color',
        name: 'Hold hover color',
      },
      {

        color: '--transfer-color',
        name: 'Transfer color',
      },
      {

        color: '--transfer--hover-color',
        name: 'Transfer hover color',
      },
      {

        color: '--job-color',
        name: 'Job color',
      },
      {

        color: '--job--hover-color',
        name: 'Job hover color',
      },
      {

        color: '--link-color',
        name: 'Link color',
      },
      {

        color: '--link--hover-color',
        name: 'Link hover color',
      },
    ],
  },
  {
    title: 'Icon colors',
    colors: [
      {

        color: '--icon-color',
        name: 'Icon color',
      },
      {

        color: '--icon-color-secondary',
        name: 'Icon secondary color',
      },
      {

        color: '--icon-color--hover',
        name: 'Icon hover color',
      },
      {

        color: '--icon-color-disabled',
        name: 'Icon disabled color',
      },
    ],
  },
  {
    title: 'Form colors',
    colors: [
      {

        color: '--form-input-color',
        name: 'User input color',
      },
      {

        color: '--form-label-color',
        name: 'Form label color',
      },
      {

        color: '--form-label--hover-color',
        name: 'Form label hover color',
      },
      {

        color: '--form-label--active-color',
        name: 'Form label active color',
      },
      {

        color: '--form-label--disabled-color',
        name: 'Form label disabled color',
      },
      {

        color: '--form-border-color',
        name: 'Form border color',
      },
      {

        color: '--form-border--hover-color',
        name: 'Form border hover color',
      },
      {

        color: '--form-border--disabled-color',
        name: 'Form border disabled color',
      },
      {

        color: '--form-placeholder-color',
        name: 'Form placeholder color',
      },
    ],
  },
  {
    title: 'Outline colors',
    colors: [
      {

        color: '--form-outline-label-color',
        name: 'Form outline label color',
      },
      {

        color: '--form-outline-border-color',
        name: 'Form outline border color',
      },
      {

        color: '--form-outline-border--hover-color',
        name: 'Form outline border hover color',
      },
    ],
  },
  {
    title: 'Text colors',
    colors: [
      {

        color: '--text-primary-color',
        name: 'Text primary color',
      },
      {

        color: '--text-outline-color',
        name: 'Text outline color',
      },
      {

        color: '--text-contrast-color',
        name: 'Text contrast color',
      },
      {

        color: '--text--disabled-color',
        name: 'Text disabled color',
      },
    ],
  },
  {
    title: 'Chat colors',
    colors: [
      {

        color: '--chat-client-message-bg-color',
        name: 'Client message background',
      },
      {

        color: '--chat-agent-message-bg-color',
        name: 'Client message background',
      },
      {

        color: '--chat-client-attachment-bg-color',
        name: 'Agent message attachment background',
      },
      {

        color: '--chat-agent-attachment-bg-color',
        name: 'Agent message attachment background',
      },
    ],
  },
];

const paletteRed = {
  title: 'red',
  colors: [
    { color: '--red-lighten-5', name: 'Red Lighten 5' },
    { color: '--red-lighten-4', name: 'Red Lighten 4' },
    { color: '--red-lighten-3', name: 'Red Lighten 3' },
    { color: '--red-lighten-2', name: 'Red Lighten 2' },
    { color: '--red-lighten-1', name: 'Red Lighten 1' },
    { color: '--red-darken-1', name: 'Red Darken 1' },
    { color: '--red-darken-2', name: 'Red Darken 2' },
    { color: '--red-darken-3', name: 'Red Darken 3' },
    { color: '--red-darken-4', name: 'Red Darken 4' },
    { color: '--red-accent-1', name: 'Red Accent 1' },
    { color: '--red-accent-2', name: 'Red Accent 2' },
    { color: '--red-accent-3', name: 'Red Accent 3' },
    { color: '--red-accent-4', name: 'Red Accent 4' },
  ],
};

const changeColor = (input, replacements) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  let result = JSON.stringify(input);
  replacements.forEach(({ from, to }) => result = result.replaceAll(from, to));
  replacements.forEach(({ from, to }) => result = result.replaceAll(capitalize(from), capitalize(to)));
  return JSON.parse(result);
};

const palette = [
  paletteRed,
  changeColor(paletteRed, [{ from: 'red', to: 'pink' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'purple' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'deep-purple' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'indigo' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'blue' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'light-blue' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'cyan' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'teal' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'green' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'light-green' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'lime' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'yellow' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'amber' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'orange' }]),
  changeColor(paletteRed, [{ from: 'red', to: 'deep-orange' }]),
  {
    title: 'grey',
    colors: [
      { color: '--grey-lighten-5', name: 'Grey Lighten 5' },
      { color: '--grey-lighten-4', name: 'Grey Lighten 4' },
      { color: '--grey-lighten-3', name: 'Grey Lighten 3' },
      { color: '--grey-lighten-2', name: 'Grey Lighten 2' },
      { color: '--grey-lighten-1', name: 'Grey Lighten 1' },
      { color: '--grey-darken-1', name: 'Grey Darken 1' },
      { color: '--grey-darken-2', name: 'Grey Darken 2' },
      { color: '--grey-darken-3', name: 'Grey Darken 3' },
      { color: '--grey-darken-4', name: 'Grey Darken 4' },
      { color: '--grey-darken-5', name: 'Grey Darken 5' },
    ],
  },
];
</script>

<style lang="scss" scoped>
.colors, .colors-family {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.colors-family-title {
  @extend %typo-heading-1;
}

.color-title {
  @extend %typo-heading-2;
}

.color-preview {
  width: 120px;
  height: 40px;
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-10);
}
</style>
