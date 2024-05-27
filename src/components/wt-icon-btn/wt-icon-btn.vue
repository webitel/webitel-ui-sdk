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

<script setup>
import WtIcon from '../wt-icon/wt-icon.vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click', 'mousedown']);
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-icon-btn {
  position: relative;
  display: block;
  width: fit-content;
  line-height: 0;

  &:hover .wt-icon--color-default :deep .wt-icon__icon {
    fill: var(--icon-btn-hover-color);
  }

  &--disabled {
    pointer-events: none;
  }
}
</style>
