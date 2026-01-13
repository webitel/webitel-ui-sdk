<template>
  <router-link
    :class="{
      'wt-item-link--disabled': disabled,
      'wt-item-link--invisible': invisible,
    }"
    :target="target"
    :to="to"
    class="wt-item-link"
  >
    <slot />
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

  /**
   * DEPRECAPTED, use :link, or make a wrapper component
   *
   * @deprecated
   */
  routeName: {
    type: String,
    default: '',
  },

  /**
   * DEPRECAPTED, use :link, or make a wrapper component
   *
   * @deprecated
   */
  id: {
    type: [String, Number],
    default: '',
  },

  /**
   * Hide styles
   */
  invisible: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const to = computed(
  () =>
    props.link || {
      name: `${props.routeName}-edit`,
      params: { id: props.id },
    },
);
</script>

<style scoped>
.wt-item-link {
  display: flex;
  align-items: center;
}

.wt-item-link:not(.wt-item-link--invisible) {
  transition: var(--transition);
  cursor: pointer;
  color: var(--wt-item-link-text-color);
}

.wt-item-link:not(.wt-item-link--invisible):hover {
  text-decoration: underline;
}

.wt-item-link--disabled {
  pointer-events: none;
}
</style>
