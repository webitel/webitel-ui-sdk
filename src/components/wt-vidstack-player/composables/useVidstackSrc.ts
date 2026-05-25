import { computed, toRef } from 'vue';

import { normalizeVidstackMediaSrc } from '../utils/normalizeVidstackMediaSrc';

export const useVidstackSrc = ({ src, type, stream }) => {
	const srcRef = toRef(src);
	const typeRef = toRef(type);
	const streamRef = toRef(stream);

	const normalizedType = computed(() => {
		if (streamRef.value) return 'video/object';

		return typeRef.value || srcRef.value?.type;
	});

	const normalizedSrcValue = computed(() => {
		if (streamRef.value) return streamRef.value;

		const src =
			typeof srcRef.value === 'string' ? srcRef.value : srcRef.value?.src;

		if (typeof src !== 'undefined' && src instanceof Blob) return src; // https://webitel.atlassian.net/browse/WTEL-9633

		return src?.replace('/download', '/stream'); // fixme https://webitel.atlassian.net/browse/WTEL-8723?focusedCommentId=733348
	});

	const normalizedSrcObject = computed(() => {
		return normalizeVidstackMediaSrc({
			src: normalizedSrcValue.value,
			type: normalizedType.value,
		});
	});

	return {
		normalizedSrcObject,
	};
};
