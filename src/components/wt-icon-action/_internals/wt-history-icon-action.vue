<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="history"
        :disabled="disabled"
        @click="emit('click')"
      ></wt-icon-btn>
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
