<template>
  <media-toggle-button
    ref="toggleButton"
    class="toggle-button"
    :disabled="props.disabled"
    @click="setToggleState"
  >
    <wt-icon-btn
      :icon="props.primaryIcon"
      :color="props.color"
      :disabled="props.disabled"
      class="toggle-button__primary"
    />
    <wt-icon-btn
      :icon="props.secondaryIcon"
      :color="props.color"
      :disabled="props.disabled"
      class="toggle-button__secondary"
    />
  </media-toggle-button>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, Ref, useTemplateRef} from 'vue';

import WtIconBtn from "../../wt-icon-btn/wt-icon-btn.vue";

const props = defineProps<{
  primaryIcon: string;
  secondaryIcon: string;
  color?: string;
  disabled?: boolean;
}>();

const toggleButton = useTemplateRef('toggleButton') as Ref<HTMLElement>;

const emit = defineEmits<{
  'toggle': [value: boolean];
}>();

const setToggleState = () => {
  if (props.disabled) return;
  emit('toggle', toggleButton.value.pressed);
}

</script>

<style lang="scss" scoped>

.toggle-button[data-pressed] .toggle-button__primary,
.toggle-button:not([data-pressed]) .toggle-button__secondary {
  display: none;
}
</style>
