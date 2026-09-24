<script setup>
import { computed, ref } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';

import badgeOnline from '../../../../../../../src/components/wt-badge/assets/badge-online.svg';

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

const iconPixelSizeMap = {
	[ComponentSize.SM]: '8px',
	[ComponentSize.MD]: '16px',
	[ComponentSize.LG]: '24px',
};

const currentIconPixelSize = computed(
	() => iconPixelSizeMap[currentSize.value.value],
);
</script>

<template>
  <wt-tabs
    :current="currentSize"
    :tabs="tabs"
    @change="currentSize = $event"
  />

  <div style="display: flex; gap: 24px; margin-top: 10px">
    <wt-badge :size="currentSize.value">
      <div style="width: 40px; aspect-ratio: 1; background: lightblue; border-radius: 50%" />

      <template #badge-content>
        <img
          :src="badgeOnline"
          alt="online"
          :style="{ width: currentIconPixelSize, height: currentIconPixelSize }"
        />
      </template>
    </wt-badge>
  </div>
</template>

<style scoped></style>
