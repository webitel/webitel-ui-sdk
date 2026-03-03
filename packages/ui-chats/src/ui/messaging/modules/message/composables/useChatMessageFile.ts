import { computed, type Ref, toRef } from 'vue';

import type { ChatMessageFile } from '../../../types/ChatMessage.types';

export function useChatMessageFile(
	file: ChatMessageFile | Ref<ChatMessageFile>,
) {
	const fileRef = toRef(file);

	const type = computed(() => {
		return fileRef.value?.mime;
	});

	const src = computed(() => {
		return fileRef.value?.url || fileRef.value?.streamUrl;
	});

	const image = computed(() => {
		const isImage = type.value?.includes('image');
		const isHEIC = type.value?.includes('heic');

		if (isHEIC) return null;

		return isImage && fileRef.value; //https://webitel.atlassian.net/browse/WTEL-6268
	});
	const media = computed(() => {
		const isMedia =
			isIncludeMediaType(src.value) || isIncludeMediaType(type.value);

		return isMedia && fileRef.value;
	});

	const isIncludeMediaType = (value: string) => {
		return !!(value?.includes('audio') || value?.includes('video'));
	};

	const document = computed(() => {
		return !media.value && !image.value && fileRef.value;
	});

	return {
		image,
		media,
		document,
	};
}
