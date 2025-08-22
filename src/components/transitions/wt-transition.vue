<template>
  <transition
    :name="props.name"
    :appear="props.appear"
    :mode="props.mode"
    class="wt-transition"
    :class="[`wt-transition--${props.duration}`]"
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
/*
* Transition classes, what based at transition name (.fade-opacity, .fade-slide ets)
* need to be pleased BEFORE classic classes (.wt-transition ets)
**/

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
</style>
