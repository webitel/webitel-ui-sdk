<template>
  <div
    v-clickaway="closePicker"
    class="wt-chat-emoji"
  >
    <wt-rounded-action
      :size="size"
      color="secondary"
      icon="chat-emoji"
      rounded
      wide
      @click="togglePicker"
    />
    <div
      v-if="isOpened"
      ref="emojiPickerWrapper"
      class="wt-chat-emoji__wrapper"
    ></div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, nextTick } from 'vue';
import * as EmojiPicker from 'emoji-picker-element/picker'; ///!not delete
import { ComponentSize } from '@webitel/ui-sdk/enums';

const props = defineProps({
  size: {
    type: String,
    default: ComponentSize.MD,
  },
});

const emit = defineEmits(['insert-emoji']);

const emojiPickerWrapper = ref(null);
const isOpened = ref(false);
const picker = ref(null);

const initPicker = async () => {
  if (picker.value) return;

  picker.value = document.createElement('emoji-picker');

  appendPicker();
  picker.value.addEventListener('emoji-click', emitEmojiClickEvent);
};

const appendPicker = () => {
  if (emojiPickerWrapper.value && picker.value) {
    emojiPickerWrapper.value.appendChild(picker.value);
  }
};

const emitEmojiClickEvent = (event) => {
  const { unicode } = event.detail;
  emit('insert-emoji', unicode);
  closePicker();
};

const closePicker = () => {
  isOpened.value = false;
  if (picker.value && emojiPickerWrapper.value) {
    picker.value.removeEventListener('emoji-click', emitEmojiClickEvent);
    emojiPickerWrapper.value.removeChild(picker.value);
    picker.value = null;
  }
};

const togglePicker = async () => {
  isOpened.value = !isOpened.value;
  if (isOpened.value) {
    await nextTick();
    await initPicker();
  } else {
    closePicker();
  }
};

onBeforeUnmount(() => {
  closePicker();
});
</script>

<style lang="scss" scoped>
.wt-chat-emoji {
  position: relative;
  width: 100%;

  :deep() emoji-picker {
    --background: var(--content-wrapper-color);
    --border-color: var(--secondary-color);
  }
}
</style>
