import type { InjectionKey } from 'vue';

export interface ChatGallery {
	/** opens the history-wide gallery at the image with this key */
	open: (imageKey: string) => void;
}

export const ChatGalleryKey: InjectionKey<ChatGallery> = Symbol('ChatGallery');
