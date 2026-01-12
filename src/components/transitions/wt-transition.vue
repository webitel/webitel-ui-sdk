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


