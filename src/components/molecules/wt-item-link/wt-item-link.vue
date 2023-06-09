<template>
  <router-link
    :target="target"
    :to="to"
    :class="{ 'wt-item-link--disabled': disabled }"
    class="wt-item-link"
  >
    <slot></slot>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  link: {
    type: [String, Object],
    default: '',
  },
  target: {
    type: String,
    default: '_self',
  },
  routeName: {
    type: String,
  },
  id: {
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const to = computed(() => props.link || {
    name: `${props.routeName}-edit`,
    params: { id: props.id },
  });
</script>

<style lang="scss" scoped>
.wt-item-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    text-decoration: underline;
  }

  &--disabled {
    pointer-events: none;
  }
}
</style>
