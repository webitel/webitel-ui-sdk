<template>
  <transition
    :appear="appear"
    :class="[`wt-transition--${duration}`]"
    :mode="mode"
    :name="name"
    class="wt-transition"
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
    default: 'fast',
  },
});
</script>

<style lang="scss" scoped>
.wt-transition {
  &--fast {
    transition-duration: var(--transition-fast);
  }
  &--normal {
    transition-duration: var(--transition-normal);
  }
  &--slow {
    transition-duration: var(--transition-slow);
  }
}

// opacity
.fade-opacity-enter-active,
.fade-opacity-leave-active {
  transition: opacity;
}

.fade-opacity-enter,
.fade-opacity-leave-to {
  opacity: 0;
}

// slide-up
.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition-timing-function: ease;
  transition-property: transform;
}

.fade-slide-up-enter-from,
.fade-slide-up-leave-to {
  transform: translateY(100%);
}

.fade-slide-up-enter-to,
.fade-slide-up-leave-from {
  transform: translateY(0);
}
</style>
