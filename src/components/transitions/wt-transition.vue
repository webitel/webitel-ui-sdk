<template>
  <transition
    class="wt-transition"
    :class="[`wt-transition--${props.duration}`]"
    :mode="props.mode"
    :appear="props.appear"
    :name="props.name"
  >
    <slot />
  </transition>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'fade-opacity',
  },
  mode: {
    type: String,
    default: 'out-in',
  },
  appear: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
    default: 'sm',
  },
});
</script>

<style lang="scss" scoped>
.fade-opacity-enter-active,
.fade-opacity-leave-active {
  transition: opacity;
}

.fade-opacity-enter,
.fade-opacity-leave-to {
  opacity: 0;
}

.wt-transition {
  &--sm {
    transition-duration: 0.3s; // TODO: add variable
  }
  &--md {
    transition-duration: 0.6s; // TODO: add variable
  }
}
</style>
