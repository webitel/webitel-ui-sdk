<template>
  <p class="chat-message-text typo-body-1">
    <span v-html="linkedText" />
    <span
      v-if="withTimestampSpacer"
      class="chat-message-text__timestamp-spacer"
      aria-hidden="true"
    />
  </p>
</template>

<script
  setup
  lang="ts"
>
import Autolinker from 'autolinker';
import { computed } from 'vue';

const props = defineProps<{
	text: string;
	withTimestampSpacer?: boolean;
}>();

const linkedText = computed(() => {
	// ATTENTION: not all libs are suitable for this case, because we want to preserve "<" signs
	// https://my.webitel.com/browse/DEV-2848
	return Autolinker.link(props.text, {
		newWindow: true,
		sanitizeHtml: true, // DONT FORGET TO SANITIZE, OR USE DOM PURIFY
		className: 'chat-message-new-text__link',
	});
});
</script>

<style
  lang="scss"
  scoped
>
.chat-message-text {
  // reset links inside text
  :deep(.chat-message-text__link) {
    color: revert;
    text-decoration: revert;
  }

  :deep(.chat-message-text__timestamp-spacer) {
    display: inline-block;
    width: var(--chat-message-timestamp-spacer-width);
    height: var(--chat-message-timestamp-spacer-height);
    vertical-align: bottom;
  }
}
</style>
