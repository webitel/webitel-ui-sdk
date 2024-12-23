<template>
  <wt-select
    :options="['sm', 'md', 'lg', 'xl', '2xl']"
    :track-by="null"
    :value="size"
    label="Size"
    style="width: 400px; margin-bottom: var(--spacing-md)"
    @input="size = $event"
  />

  <wt-table
    :data="data"
    :headers="headers"
    :selectable="false"
  >
    <template v-slot:copy="{ item }">
      <wt-copy-action :value="item.code" />
    </template>
    <template v-slot:icon="{ item }">
      <wt-icon
        :icon="item.icon"
        :size="size"
      />
    </template>
    <template v-slot:code="{ item }">
      <code>{{ item.code }}</code>
    </template>
  </wt-table>
</template>

<script setup>
import icons from '__lib__/assets/icons/sprite/index.js';
import { ref } from 'vue';

const headers = [
  { value: 'icon', width: '64px' },
  { value: 'copy', width: '64px' },
  { value: 'code' },
  { value: 'description' },
];

const data = Object.keys(icons).map((icon) => ({
  icon,
  code: icon,
  description: ' Для яких кейсів, та інші примітки',
}));

const size = ref('md');
</script>

<style lang="scss" scoped></style>
