<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="plus"
        :disabled="disabled"
        @click="emit('click')"
      ></wt-icon-btn>
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
