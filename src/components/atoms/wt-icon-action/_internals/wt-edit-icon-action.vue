<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        class="table-action"
        icon="edit"
        :disabled="disabled"
        @click="emit('click')"
      ></wt-icon-btn>
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
