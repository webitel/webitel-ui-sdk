<template>
  <wt-tooltip>
    <template #activator>
      <wt-icon-btn
        :disabled="disabled"
        icon="edit"
        @click="emit('click')"
      />
    </template>
    {{ $t('webitelUI.iconAction.editActionHint') }}
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
