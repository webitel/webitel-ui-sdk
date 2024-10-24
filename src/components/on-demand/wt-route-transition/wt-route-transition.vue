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
      <slot />
    </transition-slide>
</template>

<script setup>
  import { TransitionSlide } from '@morev/vue-transitions';
</script>
