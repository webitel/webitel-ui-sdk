<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="download"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.downloadActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-download-icon-action',
};
</script>

<style scoped>

</style>
