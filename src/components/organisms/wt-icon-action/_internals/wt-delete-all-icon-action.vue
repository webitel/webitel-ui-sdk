<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="bucket"
        :disabled="disabled"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ actionPanelDeleteTooltip }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-delete-all-icon-action',
  props: {
    selectedCount: {
      type: Number,
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  },
  computed: {
    actionPanelDeleteTooltip() {
      return this.selectedCount
        ? this.$t('webitelUI.iconAction.deleteSelectedActionHint', { count: this.selectedCount })
        : this.$t('webitelUI.iconAction.deleteAllActionHint');
    },
  },
};
</script>

<style scoped>

</style>
