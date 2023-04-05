<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="bucket"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.deleteActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-delete-icon-action',
};
</script>

<style scoped>

</style>
