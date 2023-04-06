<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="plus"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.addActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-add-icon-action',
};
</script>

<style scoped>

</style>
