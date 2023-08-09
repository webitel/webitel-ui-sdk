<template>
  <wt-icon-btn
    class="wt-collapse-action"
    :icon="props.collapsed ? 'expand' : 'collapse'"
    size="sm"
    color="icon-secondary"
    @click="emit('click')"
  ></wt-icon-btn>
</template>

<script setup>
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
