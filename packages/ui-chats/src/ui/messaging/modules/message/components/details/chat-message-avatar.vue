<template>
  <div
    class="chat-message-avatar"
  >
    <wt-avatar
      :username="props.username"
      :size="size"
      :src="src"
    />
  </div>
</template>

<script setup lang="ts">
import { WtAvatar } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { computed, defineProps, inject } from 'vue';

import botIcon from '../../../../../../assets/icons/bot.svg'

const props = withDefaults(defineProps<{
  bot?: boolean,
  username?: string,
}>(), {
  bot: false,
  username: '',
});

const injectedSize = inject<ComponentSize>('size');

const size = computed(() => {
  return ComponentSize.SM || injectedSize; // todo: should injected size be considered?
});

const src = computed(() =>
  props.bot && botIcon
)

</script>

<style lang="scss" scoped>
.chat-message-avatar {
  pointer-events: none; // prevents dragging to upload file area

  //&__bot-avatar-wrapper {
  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
  //  width: var(--wt-avatar-size--size-sm);
  //  aspect-ratio: 1;
  //  border-radius: 50%;
  //  background-color: var(--secondary-color);
  //}
}
</style>
