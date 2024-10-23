<template>
  <component
    :is="actionComponent"
    :disabled="disabled"
    @click="emit('click')"
  />
</template>

<script setup>
import { computed } from 'vue';
import IconAction from '../../enums/IconAction/IconAction.enum.js';
import WtAddIconAction from './_internals/wt-add-icon-action.vue';
import WtDeleteIconAction from './_internals/wt-delete-icon-action.vue';
import WtDownloadIconAction from './_internals/wt-download-icon-action.vue';
import WtEditIconAction from './_internals/wt-edit-icon-action.vue';
import WtHistoryIconAction from './_internals/wt-history-icon-action.vue';
import WtRefreshIconAction from './_internals/wt-refresh-icon-action.vue';

const props = defineProps({
  /**
   * available actions: IconAction.DELETE, IconAction.EDIT, IconAction.ADD, IconAction.HISTORY, IconAction.DOWNLOAD, IconAction.REFRESH
   */
  action: {
    type: String,
    required: true,
    validator: (v) => Object.values([
      IconAction.DELETE,
      IconAction.EDIT,
      IconAction.ADD,
      IconAction.HISTORY,
      IconAction.DOWNLOAD,
      IconAction.REFRESH,
    ]).includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const actionComponent = computed(() => {
  switch (props.action) {
    case IconAction.EDIT:
      return WtEditIconAction;
    case IconAction.DELETE:
      return WtDeleteIconAction;
    case IconAction.ADD:
      return WtAddIconAction;
    case IconAction.HISTORY:
      return WtHistoryIconAction;
    case IconAction.DOWNLOAD:
      return WtDownloadIconAction;
    case IconAction.REFRESH:
      return WtRefreshIconAction;
    default:
      console.error(`Unknown action for wt-icon-action component: ${props.action}`);
      return WtEditIconAction;
  }
});
</script>

<style lang="scss" scoped>

</style>
