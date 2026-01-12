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

<style  scoped>
.wt-icon-btn {
display: block;
  position: relative;
  width: fit-content;
  line-height: 0;
  cursor: pointer;

  .wt-icon-btn:hover .wt-icon--color-default {
    fill: var(--icon-btn-hover-color);
  }
}

.wt-icon-btn .wt-icon-btn--disabled {
pointer-events: none;
}
</style>
