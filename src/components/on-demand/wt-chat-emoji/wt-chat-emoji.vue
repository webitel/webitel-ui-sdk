<template>
  <div
    v-clickaway="onClickaway"
    class="wt-chat-emoji"
  >
    <wt-button
      :variant="buttonVariant"
      :size="size"
      color="secondary"
      icon="chat-emoji"
      :rounded="buttonRounded"
      wide
      @click="togglePicker"
    />
		<teleport
			:disabled="!popupTeleportTo"
		 	:to="teleportValue"
		>
			<div
				v-if="isOpened"
				ref="emojiPickerWrapper"
				class="wt-chat-emoji__wrapper"
			></div>
		</teleport>
	</div>
</template>

<script setup>
import { ComponentSize } from '@webitel/ui-sdk/enums';
import * as EmojiPicker from 'emoji-picker-element/picker'; ///!not delete
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import { WtButton } from '@webitel/ui-sdk/components';

import { eventBus } from '../../../scripts';

const props = defineProps({
	size: {
		type: String,
		default: ComponentSize.MD,
	},
	filledButton: {
		type: Boolean,
		default: false,
	},
	buttonRounded: {
		type: Boolean,
		default: false,
	},
	/**
	 * @author HlukhovYe
	 * teleport popup to specific element, pass selector
	 * https://webitel.atlassian.net/browse/WTEL-8731
	 */
	popupTeleportTo: {
		type: String,
		default: '',
	},
});

const emit = defineEmits([
	'insert-emoji',
]);

const emojiPickerWrapper = ref(null);
const isOpened = ref(false);
const picker = ref(null);

// Teleport's to prop is required even if it's disabled
const teleportValue = computed(() => props.popupTeleportTo || 'body');
const buttonVariant = computed(() =>
	props.filledButton || isOpened.value ? 'active' : 'outlined',
);

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

const onClickaway = (event) => {
	if (emojiPickerWrapper.value?.contains(event.target)) return;
	closePicker();
};

const togglePicker = async () => {
	focusOnInput();
	isOpened.value = !isOpened.value;
	if (isOpened.value) {
		await nextTick();
		await initPicker();
	} else {
		closePicker();
	}
};
const focusOnInput = () => eventBus.$emit('chat-input-focus');

onBeforeUnmount(() => {
	closePicker();
});
</script>

<style scoped>
.wt-chat-emoji {
  position: relative;
  width: 100%;
}

.wt-chat-emoji__wrapper {
	position: absolute;
	left: 50%;
	bottom: calc(100% + var(--spacing-xs));
	z-index: calc(var(--popup-wrapper-z-index) - 1);
}

:deep() emoji-picker {
	--background: var(--content-wrapper-color);
	--border-color: var(--secondary-color);
	transform: translateX(-50%);
}
</style>
