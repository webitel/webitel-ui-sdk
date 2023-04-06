<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="bucket"
        :disabled="disabled"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.deleteActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-delete-icon-action',
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
