import type { PlayerSrc } from 'vidstack';
import { computed, type MaybeRef, toRef } from 'vue';

import { normalizeVidstackMediaSrc } from '../utils/normalizeVidstackMediaSrc';

/** Loose shape accepted from consumers: a url, or an object carrying url + mime type. */
interface VidstackSrcObject {
	src?: unknown;
	type?: string;
}

export type VidstackSrcInput = string | VidstackSrcObject | undefined;

export const useVidstackSrc = ({
	src,
	type,
	stream,
}: {
	src?: MaybeRef<VidstackSrcInput>;
	type?: MaybeRef<string | undefined>;
	stream?: MaybeRef<MediaStream | undefined>;
}) => {
	const srcRef = toRef(src);
	const typeRef = toRef(type);
	const streamRef = toRef(stream);

	const srcObject = computed<VidstackSrcObject | undefined>(() =>
		typeof srcRef.value === 'object' ? srcRef.value : undefined,
	);

	const normalizedType = computed(() => {
		if (streamRef.value) return 'video/object';

		return typeRef.value || srcObject.value?.type;
	});

	const normalizedSrcValue = computed(() => {
		if (streamRef.value) return streamRef.value;

		const src =
			typeof srcRef.value === 'string' ? srcRef.value : srcObject.value?.src;

		if (src instanceof Blob) return src; // https://webitel.atlassian.net/browse/WTEL-9633

		return typeof src === 'string'
			? src.replace('/download', '/stream') // fixme https://webitel.atlassian.net/browse/WTEL-8723?focusedCommentId=733348
			: src;
	});

	const normalizedSrcObject = computed<PlayerSrc>(() => {
		return normalizeVidstackMediaSrc({
			src: normalizedSrcValue.value,
			type: normalizedType.value ?? '',
		}) as PlayerSrc;
	});

	return {
		normalizedSrcObject,
	};
};
