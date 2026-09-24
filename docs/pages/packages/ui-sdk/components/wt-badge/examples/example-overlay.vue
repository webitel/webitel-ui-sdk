<script setup>
import { ref } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';

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

  <div style="display: flex; gap: 24px; margin-top: 10px">
    <wt-badge
      :size="currentSize.value"
      value="5"
    >
      <div style="width: 40px; aspect-ratio: 1; background: lightblue; border-radius: 50%" />
    </wt-badge>

    <wt-badge
      color="success"
      :size="currentSize.value"
      value="99+"
    >
      <div style="width: 40px; aspect-ratio: 1; background: lightblue; border-radius: 8px" />
    </wt-badge>
  </div>
</template>

<style scoped></style>
