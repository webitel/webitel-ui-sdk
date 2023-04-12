<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="history"
        :disabled="disabled"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.historyActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-history-icon-action',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
