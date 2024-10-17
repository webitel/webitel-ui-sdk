<template>
  <div
    style="display:contents;"
  >
    <transition-slide
      :offset="{
              enter: ['-50%', 0],
              leave: [0, 0]
            }"
      duration="5000"
      mode="out-in"
      appear
    >
    <slot />
    </transition-slide>
  </div>
</template>

<script setup>
  import { TransitionSlide } from '@morev/vue-transitions';
</script>

<style lang="scss" scoped>
</style>
