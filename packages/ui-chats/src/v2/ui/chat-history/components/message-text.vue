<template>
  <p
    class="message-text typo-body-1"
    v-html="linkedText"
  />
</template>

<script setup lang="ts">
import Autolinker from 'autolinker';
import { computed } from 'vue';

const props = defineProps<{
	text: string;
}>();

// Autolinker keeps literal "<" signs (DEV-2848) and sanitizes the rest
const linkedText = computed(() =>
	Autolinker.link(props.text, {
		newWindow: true,
		sanitizeHtml: true,
		className: 'message-text__link',
	}),
);
</script>

<style scoped>
.message-text {
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.message-text :deep(.message-text__link) {
  color: var(--text-link-color);
  text-decoration: underline;
}
</style>
