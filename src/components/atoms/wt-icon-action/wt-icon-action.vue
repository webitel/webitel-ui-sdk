<template>
  <component
    :is="actionComponent"
    :disabled="disabled"
    @click="emit('click')"
  ></component>
</template>

<script setup>
import { computed } from 'vue';
import WtDeleteIconAction from './_internals/wt-delete-icon-action.vue';
import WtEditIconAction from './_internals/wt-edit-icon-action.vue';
import WtAddIconAction from './_internals/wt-add-icon-action.vue';
import WtHistoryIconAction from './_internals/wt-history-icon-action.vue';
import WtDownloadIconAction from './_internals/wt-download-icon-action.vue';
import WtRefreshIconAction from './_internals/wt-refresh-icon-action.vue';

const props = defineProps({
  action: {
    type: String,
    required: true,
    options: ['delete', 'edit', 'add', 'history', 'download', 'refresh'],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const actionComponent = computed(() => {
  switch (props.action) {
    case 'edit':
      return WtEditIconAction;
    case 'delete':
      return WtDeleteIconAction;
    case 'add':
      return WtAddIconAction;
    case 'history':
      return WtHistoryIconAction;
    case 'download':
      return WtDownloadIconAction;
    case 'refresh':
      return WtRefreshIconAction;
    default:
      return WtEditIconAction;
  }
});
</script>

<style lang="scss" scoped>

</style>
