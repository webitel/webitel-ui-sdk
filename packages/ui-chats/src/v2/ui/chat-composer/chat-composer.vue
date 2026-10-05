<template>
  <div
    :id="composerId"
    class="chat-composer"
  >
    <wt-textarea
      ref="field"
      class="chat-composer__field"
      :model-value="draft"
      :placeholder="t('composer.placeholder')"
      :disabled="isLocked"
      :submit-on-enter="props.submitOnEnter"
      autoresize
      @update:model-value="draft = $event ?? ''"
      @enter="send"
    />
    <div class="chat-composer__actions">
      <div class="chat-composer__actions-start">
        <template v-if="hasAction(ChatComposerAction.Attach)">
          <wt-button
            class="chat-composer__attach"
            icon="attach"
            color="secondary"
            variant="text"
            size="sm"
            :disabled="isLocked"
            :title="t('composer.attach')"
            @click="fileInput?.click()"
          />
          <input
            ref="file-input"
            class="chat-composer__file-input"
            type="file"
            multiple
            hidden
            @change="handleFilesPicked"
          >
        </template>
        <wt-chat-emoji
          v-if="hasAction(ChatComposerAction.Emoji)"
          :popup-teleport-to="`#${composerId}`"
          :rounded="false"
          size="sm"
          :title="t('composer.emoji')"
          @insert-emoji="insertText"
        />
        <slot
          name="actions"
          v-bind="slotProps"
        />
      </div>
      <wt-button
        v-if="hasAction(ChatComposerAction.Send)"
        class="chat-composer__send"
        icon="chat-send"
        color="secondary"
        size="sm"
        :loading="isSending"
        :disabled="isLocked || !canSend"
        :title="t('composer.send')"
        @mousedown.prevent
        @click="send"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WtButton, WtChatEmoji, WtTextarea } from '@webitel/ui-sdk/components';
import insertTextAtCursor from 'insert-text-at-cursor';
import { computed, nextTick, ref, useId, useTemplateRef } from 'vue';

import { useChatsV2I18n } from '../../locale/useChatsV2I18n';
import {
	ChatComposerAction,
	type ChatComposerProps,
	type ChatComposerSlotProps,
} from '../../types';

const props = withDefaults(defineProps<ChatComposerProps>(), {
	actions: () => [
		ChatComposerAction.Attach,
		ChatComposerAction.Emoji,
		ChatComposerAction.Send,
	],
	submitOnEnter: true,
	disabled: false,
});

const draft = defineModel<string>('draft', {
	default: '',
});

defineSlots<{
	actions?: (props: ChatComposerSlotProps) => unknown;
}>();

const { t } = useChatsV2I18n();

// unique per instance: the emoji popup teleports into its own composer
const composerId = `chat-composer-${useId()}`;

const field = useTemplateRef<InstanceType<typeof WtTextarea>>('field');
const fileInput = useTemplateRef<HTMLInputElement>('file-input');

const isSending = ref(false);
const isAttaching = ref(false);

const isLocked = computed(
	() => props.disabled || isSending.value || isAttaching.value,
);
const canSend = computed(() => draft.value.trim().length > 0);

const hasAction = (action: ChatComposerAction) =>
	props.actions.includes(action);

const textarea = (): HTMLTextAreaElement | null =>
	(field.value?.$el as HTMLElement | undefined)?.querySelector('textarea') ??
	null;

function focus() {
	textarea()?.focus();
}

function insertText(text: string) {
	const el = textarea();
	if (!el || el.disabled) {
		draft.value += text;
		return;
	}
	el.focus();
	// fires an input event, so the textarea's v-model picks the change up
	insertTextAtCursor(el, text);
}

async function send() {
	if (!props.onSend || isLocked.value || !canSend.value) return;

	isSending.value = true;
	try {
		await props.onSend(draft.value);
		draft.value = '';
	} finally {
		// on reject the draft stays and the error propagates to the app
		isSending.value = false;
		// the field lost focus while disabled; put the operator back in it,
		// to type on after a send or to retry after a failure
		nextTick(focus);
	}
}

async function handleFilesPicked(event: Event) {
	const input = event.target as HTMLInputElement;
	const files = Array.from(input.files ?? []);
	// reset so picking the same file again still fires change
	input.value = '';

	if (!files.length || !props.onAttach || isLocked.value) return;

	isAttaching.value = true;
	try {
		await props.onAttach(files);
	} finally {
		isAttaching.value = false;
	}
}

const slotProps = computed<ChatComposerSlotProps>(() => ({
	insertText,
	focus,
	disabled: isLocked.value,
}));

defineExpose({
	focus,
	insertText,
});
</script>

<style scoped>
.chat-composer {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--wt-ws-message-composer-sizes-root-gap);
  padding: var(--wt-ws-message-composer-sizes-root-padding-y) var(--wt-ws-message-composer-sizes-root-padding-x);
  border-radius: var(--wt-ws-message-composer-sizes-root-border-radius);
  background: var(--wt-ws-message-composer-colors-root-background);
}

.chat-composer__field {
  min-height: 0;
}

.chat-composer__field :deep(textarea) {
  max-height: 30vh;
  min-height: auto;
  overflow: auto !important;
}

.chat-composer__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--wt-ws-message-composer-sizes-root-gap);
}

.chat-composer__actions-start {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
}

/* wt-chat-emoji only offers an outlined button; DES-730 shows the bare icon,
   like the attach button beside it */
.chat-composer__actions-start :deep(.wt-chat-emoji .p-button-outlined) {
  --p-button-outlined-secondary-border-color: transparent;
  --p-button-outlined-secondary-color: var(--p-button-text-secondary-color);
  --p-button-outlined-secondary-hover-background: var(--p-button-text-secondary-hover-background);
}
</style>
