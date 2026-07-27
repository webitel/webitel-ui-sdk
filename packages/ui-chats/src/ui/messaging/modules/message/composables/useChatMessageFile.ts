import { computed, type Ref, toRef } from 'vue';

import type { ChatMessageFile } from '../../../types/ChatMessage.types';

export function useChatMessageFile(
	// `ChatMessageType.file` is optional, and every read below is optional-chained
	file: ChatMessageFile | Ref<ChatMessageFile | undefined> | undefined,
) {
	const fileRef = toRef(file);

	const fileType = computed(() => {
		return fileRef.value?.mime;
	});

	const fileSrc = computed(() => {
		return fileRef.value?.streamUrl || fileRef.value?.url;
	});

	const image = computed(() => {
		const isImage = fileType.value?.includes('image');
		const isHEIC = fileType.value?.includes('heic');

		if (isHEIC) return null;

		return isImage && fileRef.value; //https://webitel.atlassian.net/browse/WTEL-6268
	});
	const media = computed(() => {
		return (
			(isMediaType(fileType.value) || isMediaType(fileSrc.value)) &&
			fileRef.value
		);
	});

	// callers pass `fileType`/`fileSrc`, both of which are optional on the file
	const isMediaType = (value: string | undefined) => {
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
