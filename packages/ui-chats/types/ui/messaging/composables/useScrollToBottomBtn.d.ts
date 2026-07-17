import type { UseScrollReturn } from '@vueuse/core';
import { type Ref } from 'vue';
export declare const useScrollToBottomBtn: (
	chatContainer: Ref<HTMLElement | null>,
	arrivedState: UseScrollReturn['arrivedState'],
) => {
	showScrollToBottomBtn: Ref<boolean, boolean>;
	handleChatScroll: () => void;
	resetScrollToBottomBtn: () => void;
	updateScrollToBottomBtnVisibility: (el: HTMLElement) => void;
	updateThreshold: (clientHeight: number) => void;
};
