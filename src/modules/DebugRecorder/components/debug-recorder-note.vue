<template>
  <div
    class="debug-recorder-note"
    role="status"
  >
    {{ translate(textKey) }}
  </div>
</template>

<script setup lang="ts">
import { type DebugRecorderText, translate } from '../i18n';

defineProps<{
	textKey: DebugRecorderText;
}>();
</script>

<style scoped>
.debug-recorder-note {
  position: fixed;
  left: 8px;
  bottom: 8px;
  z-index: 2147483647;
  padding: 6px 10px;
  font: 13px/1.4 system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #fff;
  background: #333;
  border-radius: 8px;
}
</style>
