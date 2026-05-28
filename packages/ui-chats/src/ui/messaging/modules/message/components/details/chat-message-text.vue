<template>
  <p
    class="chat-message-text typo-body-1"
    v-html="text"
  />
</template>

<script
  setup
  lang="ts"
>
import Autolinker from 'autolinker';
import { computed, defineProps } from 'vue';

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

const text = computed(() => {
	if (!props.withTimestampSpacer) return linkedText.value;
	return (
		linkedText.value +
		'<span class="chat-message-text__timestamp-spacer" aria-hidden="true"></span>'
	);
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
    width: var(--chat-message-timestamp-spacer-width, 44px);
    height: 1em;
    vertical-align: bottom;
  }
}
</style>
