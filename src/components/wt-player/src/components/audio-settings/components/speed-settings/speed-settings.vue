<template>
  <div class="speed-settings">
    <div class="speed-settings__controls">
      <wt-button
        :size="ComponentSize.SM"
        :disabled="modelValue <= minSpeed"
        class="speed-settings__step-button"
        variant="outlined"
        color="secondary"
        @click="handleDecrease"
      >
        <template #default>
          <wt-icon icon="minus" :size="ComponentSize.SM" />
        </template>
      </wt-button>

      <span class="speed-settings__label">{{ formattedSpeed }}</span>

      <wt-button
        :size="ComponentSize.SM"
        :disabled="modelValue >= maxSpeed"
        class="speed-settings__step-button"
        variant="outlined"
        color="secondary"
        @click="handleIncrease"
      >
        <template #default>
          <wt-icon icon="plus" :size="ComponentSize.SM" />
        </template>
      </wt-button>
    </div>

    <wt-slider
      class="speed-settings__slider"
      :model-value="modelValue"
      :min="minSpeed"
      :max="maxSpeed"
      :step="speedStep"
      @update:model-value="$emit('update:modelValue', $event)"
    />

    <div class="speed-settings__presets">
      <wt-button
        v-for="speedPreset in speedPresets"
        :key="speedPreset.speed"
        :size="ComponentSize.SM"
        variant="outlined"
        class="speed-settings__preset-button"
        color="secondary"
        @click="$emit('update:modelValue', speedPreset.speed)"
      >
        <template #default>
          <wt-icon :icon="speedPreset.icon" :size="ComponentSize.SM" />
        </template>
      </wt-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { WtButton, WtIcon, WtSlider } from '../../../../../../../components';
import { ComponentSize } from '../../../../../../../enums';

interface Props {
	modelValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: 1,
});

const emit = defineEmits<{
	'update:modelValue': [
		value: number,
	];
}>();

const minSpeed = 0.25;
const maxSpeed = 3;
const speedStep = 0.25;
const speedPresets = [
	{
		speed: 0.5,
		icon: 'playback-0.50',
	},
	{
		speed: 0.75,
		icon: 'playback-0.75',
	},
	{
		speed: 1,
		icon: 'playback-1.00',
	},
	{
		speed: 1.5,
		icon: 'playback-1.50',
	},
	{
		speed: 1.75,
		icon: 'playback-1.75',
	},
];

const formattedSpeed = computed(() => `${props.modelValue.toFixed(2)}x`);

function handleDecrease() {
	const decreasedSpeed = parseFloat((props.modelValue - speedStep).toFixed(2));
	const clampedSpeed = Math.max(minSpeed, decreasedSpeed);
	emit('update:modelValue', clampedSpeed);
}

function handleIncrease() {
	const increasedSpeed = parseFloat((props.modelValue + speedStep).toFixed(2));
	const clampedSpeed = Math.min(maxSpeed, increasedSpeed);
	emit('update:modelValue', clampedSpeed);
}
</script>

<style scoped>
.speed-settings {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  min-width: 192px;
}
.speed-settings__step-button {
  min-width: 0;
  padding: var(--spacing-xs);
}

.speed-settings__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.speed-settings__label {
  font-weight: 600;
  font-size: var(--font-size-lg, 1rem);
  text-align: center;
  flex: 1;
}

.speed-settings__slider {
  width: 100%;
}

.speed-settings__presets {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-xs);
}

.speed-settings__preset-button {
  min-width: 0;
  padding: var(--spacing-xs);
}
</style>
