import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';

import type { WaveAnnotation } from '../types/callWave';
import { annotationSecondsToInt } from './useCallWaveAnnotations';
import type { WaveformLayout } from './useWaveformLayout';
import {
	isInVisibleWaveform,
	MARKER_GAP_PX,
	secondsToVisiblePx,
	spreadWithoutOverlap,
} from './useWaveformLayout';

export const COMMENT_MARKER_SIZE_PX = 48;
export const COMMENT_CARD_WIDTH_PX = 306;

export interface CommentMarker {
	key: string;
	comment: WaveAnnotation;
	leftPx: number;
}

function commentKey(comment: WaveAnnotation): string {
	return comment.id ?? `${comment.startSec}-${comment.endSec}`;
}

export function useCallWaveCommentMarkers(
	layout: Ref<WaveformLayout | null>,
	annotations: ComputedRef<WaveAnnotation[]>,
) {
	const markers = computed<CommentMarker[]>(() => {
		const waveform = layout.value;
		if (!waveform) {
			return [];
		}

		const lastAvatarPx =
			waveform.waveformWidthPx - waveform.scrollPx - COMMENT_MARKER_SIZE_PX;

		const getAvatarLeftPx = (comment: WaveAnnotation): number => {
			const startPx = secondsToVisiblePx(
				waveform,
				annotationSecondsToInt(comment.startSec),
			);
			return Math.min(startPx, lastAvatarPx);
		};

		const commentsByStart = [
			...annotations.value,
		].sort(
			(a, b) =>
				annotationSecondsToInt(a.startSec) - annotationSecondsToInt(b.startSec),
		);

		const leftPositionsPx = spreadWithoutOverlap(
			commentsByStart.map(getAvatarLeftPx),
			COMMENT_MARKER_SIZE_PX,
			MARKER_GAP_PX,
			lastAvatarPx,
		);

		return commentsByStart
			.map((comment, index) => ({
				key: commentKey(comment),
				comment,
				leftPx: leftPositionsPx[index],
			}))
			.filter(({ leftPx }) =>
				isInVisibleWaveform(waveform, leftPx, COMMENT_MARKER_SIZE_PX),
			);
	});

	return {
		markers,
	};
}
