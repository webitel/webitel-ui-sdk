<template>
  <div
    class="debug-recorder-note typo-body-2"
    role="status"
  >
    {{ t(`${KEY}.${textKey}`) }}
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { DEBUG_RECORDER_LOCALE_KEY as KEY } from '../indicator';

defineProps<{
	textKey: string;
}>();

const { t } = useI18n();
</script>

<style scoped>
.debug-recorder-note {
  position: fixed;
  left: var(--spacing-xs);
  bottom: var(--spacing-xs);
  z-index: 2147483647;
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--text-main-color);
  background: var(--content-wrapper-color);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-10);
}
</style>
