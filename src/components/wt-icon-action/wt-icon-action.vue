<template>
  <wt-icon-btn
    v-tooltip="t(iconAction.hint)"
    :disabled="disabled"
    :icon="iconAction.icon"
    :size="size"
    @click="emit('click', $event)"
    @mousedown="emit('mousedown', $event)"
  />
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import IconAction from '../../enums/IconAction/IconAction.enum.js';
import { WtIconActionIconMappings } from './iconMappings.js';

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
        IconAction.SAVE,
        IconAction.CANCEL,
        IconAction.SAVE_PRESET,
        IconAction.APPLY_PRESET,
        IconAction.ADD_CONTACT,
        IconAction.DOWNLOAD_PDF,
      ]).includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
    required: false,
  },
});

const emit = defineEmits(['click', 'mousedown']);

const { t } = useI18n();

const iconAction = computed(() => {
  const icon = WtIconActionIconMappings[props.action];

  if (!icon) {
    console.error(
      `Unknown action for wt-icon-action component: ${props.action}`,
    );
    return { icon: 'edit', hint: props.action };
  }

  return {
    icon,
    hint: `webitelUI.iconAction.hints.${props.action}`,
  };
});
</script>

<style lang="scss" scoped></style>
