<script setup>
import { ref } from 'vue';
import { BadgeColor, ComponentSize } from '@webitel/ui-sdk/enums';

const tabs = [
	{
		text: 'SM',
		value: ComponentSize.SM,
	},
	{
		text: 'MD',
		value: ComponentSize.MD,
	},
	{
		text: 'LG',
		value: ComponentSize.LG,
	},
];

const currentSize = ref(tabs[1]);
</script>

<template>
  <wt-tabs
    :current="currentSize"
    :tabs="tabs"
    @change="currentSize = $event"
  />

  <div style="display: flex; gap: 10px; align-items: center; margin-top: 10px">
    <wt-badge
      v-for="color in Object.values(BadgeColor)"
      :key="color"
      :color="color"
      :size="currentSize.value"
      value="5"
    />
  </div>
</template>

<style scoped></style>
