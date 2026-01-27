<template>
  <wt-select
    :options="['sm', 'md', 'lg', 'xl', '2xl']"
    :track-by="null"
    :value="size"
    label="Size"
    style="width: 400px; margin-bottom: var(--spacing-md)"
    @input="size = $event"
  />

  <div style="position: relative;">
    <wt-search-bar
    style="position: sticky;"
    :value="search"
    placeholder="Search icons"
    @input="search = $event"
  />
  </div>

  <wt-table
    :data="data"
    :headers="headers"
    headless
    :selectable="false"
  >
    <template #copy="{ item }">
      <wt-copy-action :value="item.code" />
    </template>
    <template #icon="{ item }">
      <wt-icon
        :icon="item.icon"
        :size="size"
      />
    </template>
    <template #code="{ item }">
      <code>{{ item.code }}</code>
    </template>
  </wt-table>
</template>

<script setup>
import icons from '__lib__/assets/icons/sprite';
import { computed, ref } from 'vue';

const headers = [
	{
		value: 'icon',
		width: '64px',
	},
	{
		value: 'copy',
		width: '64px',
	},
	{
		value: 'code',
	},
	{
		value: 'description',
	},
];

const size = ref('md');
const search = ref('');

const data = computed(() =>
	Object.keys(icons)
		.filter((icon) => icon.includes(search.value))
		.map((icon) => ({
			icon,
			code: icon,
			description: ' Для яких кейсів, та інші примітки',
		})),
);
</script>
