<script setup>
import Component from '__lib__/components/wt-player/wt-player.vue';
</script>

<template>
  <component-info v-if="Component?.docs" :info="Component.docs" />
</template>
