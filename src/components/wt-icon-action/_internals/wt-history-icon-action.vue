<template>
  <wt-tooltip>
    <template #activator>
      <wt-icon-btn
        :disabled="disabled"
        icon="history"
        @click="emit('click')"
      />
    </template>
    {{ $t('webitelUI.iconAction.historyActionHint') }}
  </wt-tooltip>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);
</script>

<style scoped>

</style>
