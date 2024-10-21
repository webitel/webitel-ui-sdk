<template>
  <div class="table-transition">
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
  </div>
</template>

<script setup>
  import { TransitionSlide } from '@morev/vue-transitions';
</script>

<style lang="scss" scoped>
  .table-transition{
    display:contents;
  }
</style>
