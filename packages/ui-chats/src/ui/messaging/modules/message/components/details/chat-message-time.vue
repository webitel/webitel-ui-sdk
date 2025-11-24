<template>
  <aside class="chat-message-time">
    <div class="chat-message-time__sent-at">
      {{ time }}
    </div>
  </aside>
</template>


<script setup lang="ts">
import prettifyTime from '@webitel/ui-sdk/src/scripts/prettifyTime';
import { computed } from 'vue';

interface ChatMessageTimeProps {
  date?: string;
}

const props = withDefaults(defineProps<ChatMessageTimeProps>(), {
  date: '',
})


const time = computed(() => prettifyTime(props.date));
</script>

<style lang="scss" scoped>
.chat-message-time {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  &__sent-at {
    @extend %typo-caption;
    color: var(--text-main-color);
    white-space: nowrap;
  }
}
</style>
