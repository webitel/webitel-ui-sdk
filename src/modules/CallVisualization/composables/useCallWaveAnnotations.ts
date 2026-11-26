import { CallAnnotationsAPI } from '@webitel/api-services/api';
import type { ComputedRef, Ref } from 'vue';
import { eventBus } from '../../../scripts';
import type { WaveAnnotation } from '../types/callWave';

export function annotationSecondsToInt(
	value: number | string | undefined,
): number {
	const numericValue = Number(value);
	if (!Number.isFinite(numericValue)) {
		return 0;
	}
	return Math.round(Math.max(0, numericValue));
}

export function getCommentAuthorName(comment: WaveAnnotation): string {
	return comment.createdBy?.name || comment.createdBy?.id || '';
}

interface SaveCommentMessages {
	successText?: string;
	errorText?: string;
}

interface UseCallWaveAnnotationsOptions {
	callId: string;
	currentFileId: ComputedRef<string | undefined>;
	annotations: Readonly<Ref<WaveAnnotation[]>>;
	updateAnnotations: (annotations: WaveAnnotation[]) => void;
}

export function useCallWaveAnnotations({
	callId,
	currentFileId,
	annotations,
	updateAnnotations,
}: UseCallWaveAnnotationsOptions) {
	async function saveComment(
		draft: WaveAnnotation,
		{ successText, errorText }: SaveCommentMessages = {},
	): Promise<boolean> {
		try {
			const itemInstance = {
				callId,
				...draft,
				fileId: draft.fileId || currentFileId.value,
				startSec: annotationSecondsToInt(draft.startSec),
				endSec: annotationSecondsToInt(draft.endSec),
			};
			if (draft.id) {
				const responseAnnotation = await CallAnnotationsAPI.update({
					itemInstance,
				});
				updateAnnotations(
					annotations.value.map((annotation) =>
						annotation.id === draft.id ? responseAnnotation : annotation,
					),
				);
			} else {
				const responseAnnotation = await CallAnnotationsAPI.add({
					itemInstance,
				});
				updateAnnotations([
					...annotations.value,
					responseAnnotation,
				]);
			}
			if (successText) {
				eventBus.$emit('notification', {
					type: 'success',
					text: successText,
				});
			}
			return true;
		} catch (error) {
			eventBus.$emit('notification', {
				type: 'error',
				text: errorText || (error as Error).message,
			});
			return false;
		}
	}

	async function deleteComment(comment: WaveAnnotation) {
		if (!comment.id) {
			return;
		}
		try {
			const responseAnnotation = await CallAnnotationsAPI.delete({
				itemInstance: {
					id: comment.id,
					callId,
				},
			});
			updateAnnotations(
				annotations.value.filter(
					(annotation) => annotation.id !== responseAnnotation.id,
				),
			);
		} catch (error) {
			eventBus.$emit('notification', {
				type: 'error',
				text: (error as Error).message,
			});
		}
	}

	return {
		saveComment,
		deleteComment,
	};
}
