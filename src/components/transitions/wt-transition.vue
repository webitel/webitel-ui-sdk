<template>
  <transition
    class="wt-transition"
    :class="[`wt-transition--${durationVar}`]"
    :mode="mode"
    :appear="props.appear"
    :name="name"
  >
    <slot />
  </transition>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'fade',
  },
  mode: {
    type: String,
    default: 'out-in',
  },
  appear: {
    type: Boolean,
    default: false,
  },
  durationVar: {
    type: String,
    default: 'sm',
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wt-transition {
  &--sm {
    transition-duration: var(
      --transition-sm
    ); // 0.3s // чекаю на змінну від Жені
  }
  &--md {
    transition-duration: var(
      --transition-md
    ); // 0.6s // чекаю на змінну від Жені
  }
}
</style>
