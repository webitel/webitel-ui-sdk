<template>
  <PMenubar class="wt-app-header">
    <template
      v-for="(_, name) in slots"
      :key="name"
      #[name]
    >
      <slot v-if="name !== 'default'" :name="name" />
    </template>
  </PMenubar>
</template>

<script setup>
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-app-header {
  box-sizing: border-box;
}
</style>
