<template>
  <wt-icon-btn
    class="wt-collapse-action"
    :icon="collapsed ? 'expand' : 'collapse'"
    size="sm"
    @click="$emit('click')"
  ></wt-icon-btn>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
.wt-collapse-action {
  line-height: 0;
}
</style>
