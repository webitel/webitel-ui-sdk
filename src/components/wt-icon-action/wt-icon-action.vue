<template>
  <wt-tooltip>
    <template #activator>
      <wt-icon-btn
        :disabled="disabled"
        :icon="iconAction.icon"
        @click="emit('click', $event)"
        @mousedown="emit('mousedown', $event)"
      />
    </template>
    {{ t(iconAction.hint) }}
  </wt-tooltip>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import IconAction from '../../enums/IconAction/IconAction.enum.js';
import WtIconBtn from '../wt-icon-btn/wt-icon-btn.vue';
import WtTooltip from '../wt-tooltip/wt-tooltip.vue';
import { IActionData } from './IActionData.js';

const props = defineProps({
  /**
   * `IconAction` enum value
   */
  action: {
    type: String,
    required: true,
    validator: (v) =>
      Object.values([
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

const emit = defineEmits(['click', 'mousedown']);

const { t } = useI18n();

const iconAction = computed(() => {
  const data = IActionData[props.action];

  if (!data) {
    console.error(
      `Unknown action for wt-icon-action component: ${props.action}`,
    );
    return { icon: 'edit', hint: props.action };
  }

  return data;
});
</script>

<style lang="scss" scoped></style>
