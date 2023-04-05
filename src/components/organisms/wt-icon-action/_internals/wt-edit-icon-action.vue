<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        class="table-action"
        icon="edit"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.editActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-edit-icon-action',
};
</script>

<style scoped>

</style>
