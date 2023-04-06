<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="history"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.historyActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-history-icon-action',
};
</script>

<style scoped>

</style>
