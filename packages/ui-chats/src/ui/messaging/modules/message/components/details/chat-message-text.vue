<template>
  <p
    class="chat-message-text"
    v-html="text"
  />
</template>

<script setup lang="ts">
import Autolinker from 'autolinker';
import { computed } from 'vue';

interface Props {
  text: string;
  agent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  agent: false,
})

const text = computed(() => {
  // ATTENTION: not all libs are suitable for this case, because we want to preserve "<" signs
  // https://my.webitel.com/browse/DEV-2848
  return Autolinker.link(props.text, {
    newWindow: true,
    sanitizeHtml: true, // DONT FORGET TO SANITIZE, OR USE DOM PURIFY
    className: 'chat-message-new-text__link',
  });
})
</script>

<style lang="scss" scoped>

.chat-message-text {
  @extend %typo-body-1;
  overflow-wrap: anywhere;
  white-space: pre-line; // read \n as "new line"
  padding: var(--spacing-xs);
  border-radius: var(--border-radius);
  background: var(--primary-light-color);
  color: var(--primary-on-color);
  place-self: flex-start;

  // reset links inside text
  :deep(.chat-message-text__link) {
    color: revert;
    text-decoration: revert;
  }
}

</style>
