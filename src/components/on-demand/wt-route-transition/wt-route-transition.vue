<template>
  <router-view v-slot="{ Component }">
    <transition-slide
      :offset="{
              enter: ['-50%', 0],
              leave: [0, 0]
            }"
      duration="200"
      mode="out-in"
      appear
    >
      <component :is="Component" />
    </transition-slide>
  </router-view>
</template>

<script setup>
  import { TransitionSlide } from '@morev/vue-transitions';
</script>
