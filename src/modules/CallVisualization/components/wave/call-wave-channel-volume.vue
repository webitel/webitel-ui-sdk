<template>
  <wt-popover>
    <template #activator="{ toggle }">
      <div @click="toggle">
        <wt-icon-btn :icon="muted ? 'sound-off' : 'sound-on'" />
      </div>
    </template>

    <wt-slider
      :max="2"
      :min="0"
      :step="0.01"
      :width="130"
      :model-value="volume"
      @update:model-value="emit('update:volume', $event)"
    />
  </wt-popover>
</template>

<script setup lang="ts">
defineProps<{
	volume: number;
	muted: boolean;
}>();

const emit = defineEmits<{
	'update:volume': [
		value: number,
	];
}>();
</script>
