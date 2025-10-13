<template>
  <PMenubar class="wt-menubar">
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
/**
 * @author Oleksandr Palonnyi
 *
 * @description https://webitel.atlassian.net/browse/WTEL-7529?focusedCommentId=692643
 * */
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
</style>
