<template>
  <button
    :class="{ 'wt-icon-btn--disabled': disabled }"
    class="wt-icon-btn"
    type="button"
    @click="emit('click', $event)"
    @mousedown="emit('mousedown', $event)"
  >
    <!--    prevent icon-btn classes to fall to wt-icon -->
    <wt-icon
      :disabled="disabled"
      v-bind="{ ...$attrs, class: '' }"
    />
  </button>
</template>

<script setup lang="ts">
import WtIcon from '../wt-icon/wt-icon.vue';

const { disabled = false } = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  click: MouseEvent[];
  mousedown: MouseEvent[];
}>();
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-icon-btn {
  display: block;
  position: relative;
  width: fit-content;
  line-height: 0;

  &:hover .wt-icon--color-default {
    fill: var(--icon-btn-hover-color);
  }

  &--disabled {
    pointer-events: none;
  }
}
</style>
