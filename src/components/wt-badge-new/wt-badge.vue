<template>
  <p-badge :value="props.value" :class="[
    props.size`p-badge--${props.size}`,
    props.severity`p-badge--${props.severity}`
  ]" class="wt-badge typo-caption">
    <slot />
  </p-badge>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

import { ComponentSize } from "../../enums";

interface Props {
  value: string | number
  severity?:
  "secondary" |
  "info" |
  "success" |
  "warn" |
  "error" |
  "online" |
  "dnd" |
  "busy" |
  "pause" |
  "onlineCc" |
  "offline"
  size?: ComponentSize
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  severity: null,
  size: ComponentSize.MD,
})
</script>

<style scoped>
.wt-badge {
  /* Typography handled by typo-caption class in template */
}
</style>
