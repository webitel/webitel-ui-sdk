<script setup>
import { ref } from 'vue';
import { ButtonVariant, ComponentSize } from '../../../../../../../src/enums';

const colors = [
	'primary',
	'secondary',
	'success',
	'warn',
	'error',
	'info',
	'job',
	'transfer',
];

const tabs = [
	{
		text: 'XS',
		value: ComponentSize.XS,
	},
	{
		text: 'SM',
		value: ComponentSize.SM,
	},
	{
		text: 'MD',
		value: ComponentSize.MD,
	},
];

const currentSize = ref(tabs[0]);
</script>

<template>
  <wt-tabs
    :current="currentSize"
    :tabs="tabs"
    wide
    @change="currentSize = $event"
  />
  <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-xs)">
      <wt-button
        v-for="color of colors"
        :key="color"
        :color="color"
        :size="currentSize.value"
        icon="call"
        raised
      />
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-xs)">
      <wt-button
        v-for="color of colors"
        :key="color"
        :color="color"
        :size="currentSize.value"
        icon="call"
        raised
        rounded
      />
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-xs)">
      <wt-button
        v-for="color of colors"
        :key="color"
        :color="color"
        :size="currentSize.value"
        :variant="ButtonVariant.OUTLINED"
        icon="call"
        raised
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
