<template>
  <wt-tooltip>
    <template #activator>
      <wt-icon-btn
        icon="plus"
        :disabled="disabled"
        @click="emit('click')"
      />
    </template>
    {{ $t('webitelUI.iconAction.addActionHint') }}
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
