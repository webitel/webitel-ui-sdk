<template>
  <section class="chat-history">
    <div
      ref="scroll-container"
      class="chat-history__scroll wt-scrollbar"
      @scroll="handleChatScroll"
    >
      <div
        ref="scroll-content"
        class="chat-history__content"
      >
        <div
          v-if="props.hasMore"
          class="chat-history__sentinel"
        >
          <wt-loader
            v-if="isLoadingMore"
            class="chat-history__loader"
            size="sm"
          />
          <wt-intersection-observer
            :can-load-more="props.hasMore && !isLoadingMore"
            :loading="isLoadingMore"
            @next="handleLoadMore"
          />
        </div>

        <div
          v-for="item of items"
          :key="item.key"
          class="chat-history__item"
        >
          <chat-date-divider
            v-if="item.kind === 'divider'"
            :date="item.date"
          />
          <chat-system-notice
            v-else-if="item.kind === 'system'"
            :message="item.message"
            :thread="props.thread"
            :resolve-avatar-url="props.resolveAvatarUrl"
          />
          <chat-message
            v-else
            :message="item.message"
            :thread="props.thread"
            :self-member-id="props.selfMemberId"
            :resolve-avatar-url="props.resolveAvatarUrl"
          />
        </div>

        <div
          v-if="props.mode === ChatThreadMode.Awaiting"
          class="chat-history__awaiting typo-caption"
        >
          {{ t('history.waitingForOperator') }}
        </div>
      </div>
    </div>

    <scroll-to-bottom-btn
      v-if="showScrollToBottomBtn"
      :new-message-count="newUnseenMessagesCount"
      @scroll="scrollToBottom('smooth')"
    />

    <wt-galleria
      v-model:visible="isGalleryOpen"
      v-model:active-index="galleryIndex"
      :value="galleryItems"
      delete-disabled
      @download="downloadGalleryImage"
    />
  </section>
</template>

<script setup lang="ts">
import {
	WtGalleria,
	WtIntersectionObserver,
	WtLoader,
} from '@webitel/ui-sdk/components';
import { computed, provide, ref, useTemplateRef, watch } from 'vue';

import { useChatScroll } from '../../../shared/composables/useChatScroll';
import { useObserveHeightUntilStable } from '../../../shared/composables/useObserveHeightUntilStable';
import { useChatsV2I18n } from '../../locale/useChatsV2I18n';
import { collectGalleryImages } from '../../scripts/attachments';
import { toHistoryItems } from '../../scripts/toHistoryItems';
import {
	type ChatHistoryProps,
	ChatThreadMode,
	type MessageModel,
} from '../../types';
import ChatDateDivider from './components/chat-date-divider.vue';
import ChatMessage from './components/chat-message.vue';
import ChatSystemNotice from './components/chat-system-notice.vue';
import ScrollToBottomBtn from './components/scroll-to-bottom-btn.vue';
import { ChatGalleryKey } from './gallery';

/** how long after (re)opening a thread late layout shifts still pin the bottom */
const SETTLE_TIMEOUT_MS = 2000;

const props = withDefaults(defineProps<ChatHistoryProps>(), {
	mode: ChatThreadMode.Active,
	hasMore: false,
});

const emit = defineEmits<{
	seen: [
		message: MessageModel,
	];
}>();

const { t } = useChatsV2I18n();

const scrollContainer = useTemplateRef<HTMLElement>('scroll-container');
const scrollContent = useTemplateRef<HTMLElement>('scroll-content');

const items = computed(() => toHistoryItems(props.messages));

const isLoadingMore = ref(false);

let lastSeenId: string | null = null;

function handleSeen() {
	const newest = props.messages.at(-1);
	if (!newest || newest.id === lastSeenId) return;
	lastSeenId = newest.id;
	emit('seen', newest);
}

const {
	showScrollToBottomBtn,
	newUnseenMessagesCount,
	scrollToBottom,
	loadNextMessages,
	handleChatScroll,
} = useChatScroll<MessageModel>({
	chatContainer: scrollContainer,
	chatContent: scrollContent,
	messages: computed(() => props.messages),
	isSelf: (message) =>
		!!message.sender?.id && message.sender.id === props.selfMemberId,
	itemClass: 'chat-history__item',
	chatId: computed(() => props.thread.id),
	isChatClosed: computed(() => false),
	isLoading: isLoadingMore,
	onBeforeStart: ({ scrollToBottom }) => {
		scrollToBottom();
		startObserve();
	},
	onSeen: handleSeen,
});

const { startObserve } = useObserveHeightUntilStable(
	scrollContainer,
	() => scrollToBottom('instant'),
	SETTLE_TIMEOUT_MS,
);

function handleLoadMore() {
	const onLoadMore = props.onLoadMore;
	if (!onLoadMore || isLoadingMore.value) return;

	loadNextMessages(props.hasMore, async () => {
		isLoadingMore.value = true;
		try {
			await onLoadMore();
		} catch {
			// the app owns error reporting; the sentinel retries on next sight
		} finally {
			isLoadingMore.value = false;
		}
	});
}

const galleryImages = computed(() => collectGalleryImages(props.messages));

const galleryItems = computed(() =>
	galleryImages.value.map(({ src }) => ({
		src,
		thumbnailSrc: src,
		title: '',
	})),
);

const isGalleryOpen = ref(false);
const galleryIndex = ref(0);

provide(ChatGalleryKey, {
	open: (imageKey) => {
		const index = galleryImages.value.findIndex(
			(image) => image.key === imageKey,
		);
		if (index < 0) return;
		galleryIndex.value = index;
		isGalleryOpen.value = true;
	},
});

function downloadGalleryImage(index: number) {
	const image = galleryImages.value[index];
	if (image) window.open(image.src, '_blank', 'noopener');
}

watch(
	() => props.thread.id,
	() => {
		lastSeenId = null;
		isGalleryOpen.value = false;
	},
);
</script>

<style scoped>
.chat-history {
  position: relative;
  display: flex;
  min-height: 0;
  overflow: hidden;
  background: var(--wt-ws-chat-window-colors-root-background);
}

.chat-history__scroll {
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: var(--scrollbar-width);
  scrollbar-gutter: stable both-edges;
}

.chat-history__content {
  display: flex;
  flex-direction: column;
  gap: var(--wt-ws-chat-window-sizes-root-gap);
  padding: var(--wt-ws-chat-window-sizes-root-padding-y) var(--wt-ws-chat-window-sizes-root-padding-x);
}

.chat-history__sentinel {
  /* reserve the loader's height so its appearance does not shift the rows (WTEL-5366) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: calc(var(--spacing-lg) * 2 + var(--icon-md-size));
}

.chat-history__awaiting {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-disabled-color);
  font-style: italic;
}

.chat-history__awaiting::before,
.chat-history__awaiting::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--p-divider-border-color);
}
</style>
