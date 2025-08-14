<template>
  <p-slider
    v-model="model"
    :disabled="disabled"
    :max="max"
    :min="min"
    :step="step"
    :orientation="orientation"
    :style="{ 
      height: vertical ? `${height}px` : '',
      width: !vertical && width ? `${width}px` : '',
     }"
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
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  vertical: false,
  min: 0,
  max: 100,
  step: 1,
  height: 100,
  width: undefined,
});

const model = defineModel<number>();

const orientation = computed(() => (props.vertical ? 'vertical' : 'horizontal'));
</script>
