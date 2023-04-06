<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        class="table-action"
        icon="edit"
        :disabled="disabled"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.editActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-edit-icon-action',
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
