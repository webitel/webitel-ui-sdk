<template>
  <transition-slide
    :offset="{
          enter: ['-50%', 0],
          leave: [0, 0]
        }"
    duration="200"
    mode="out-in"
    appear
  >
    <component :is="component" />
  </transition-slide>
</template>

<script setup>
  import { TransitionSlide } from '@morev/vue-transitions';
  import { defineProps } from 'vue';

  const props = defineProps({
    component: {
      type: Object,
      required: true
    }
  });
</script>
