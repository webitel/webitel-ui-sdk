<template>
  <p-slider
    v-model="model"
    :disabled="disabled"
    :max="max"
    :min="min"
    :step="step"
    :orientation="orientation"
    :style="{ height: vertical ? `${height}px` : '' }"
  />
  
</template>

<script setup lang="ts">
import type { SliderProps } from 'primevue/slider';
import { computed, defineModel } from 'vue';

interface Props extends SliderProps{
  disabled?: boolean;
  vertical?: boolean;
  min?: number;
  max?: number;
  step?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  vertical: false,
  min: 0,
  max: 100,
  step: 1,
  height: 100,
});

const model = defineModel<number>();

const orientation = computed(() => (props.vertical ? 'vertical' : 'horizontal'));
</script>
