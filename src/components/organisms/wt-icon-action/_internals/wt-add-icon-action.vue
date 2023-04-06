<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="plus"
        :disabled="disabled"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.iconAction.addActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-add-icon-action',
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
