<template>
  <p-badge
    :size="badgeSizes[props.size]"
    :value="props.value"
    :severity="props.severity"
    class="wt-badge"
  >
    <slot />
  </p-badge>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

import {ComponentSize} from "../../enums";

interface Props {
  value: string | number
  severity?: null | "secondary" | "info" | "success" | "warn" | "danger" | "contrast"
  size?: null | "small" | "large" | "xlarge"
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  severity: null,
  size: ComponentSize.SM,
})

const badgeSizes = {
  [ComponentSize.SM]: 'small',
  [ComponentSize.LG]: 'large',
  [ComponentSize.XL]: 'xlarge',
}
</script>

<style lang="scss" scoped>

</style>
