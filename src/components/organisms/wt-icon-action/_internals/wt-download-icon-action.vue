<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="download"
        :disabled="disabled"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.downloadActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-download-icon-action',
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
