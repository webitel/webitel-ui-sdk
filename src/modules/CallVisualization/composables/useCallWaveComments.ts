import type { ComputedRef, Ref } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type WaveSurfer from 'wavesurfer.js';
import { useDeleteConfirmationPopup } from '../../DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import type {
	CommentFormDraft,
	NewCommentDraft,
	WaveAnnotation,
} from '../types/callWave';
import {
	annotationSecondsToInt,
	useCallWaveAnnotations,
} from './useCallWaveAnnotations';
import type { useCallWaveRegions } from './useCallWaveRegions';

interface UseCallWaveCommentsOptions {
	callId: string;
	currentFileId: ComputedRef<string | undefined>;
	annotations: Readonly<Ref<WaveAnnotation[]>>;
	updateAnnotations: (annotations: WaveAnnotation[]) => void;
	getPlayer: () => WaveSurfer | null | undefined;
	regions: ReturnType<typeof useCallWaveRegions>;
}

export function useCallWaveComments({
	callId,
	currentFileId,
	annotations,
	updateAnnotations,
	getPlayer,
	regions,
}: UseCallWaveCommentsOptions) {
	const { t } = useI18n();
	const { saveComment, deleteComment } = useCallWaveAnnotations({
		callId,
		currentFileId,
		annotations,
		updateAnnotations,
	});
	const deleteConfirmation = useDeleteConfirmationPopup();

	const newComment = ref<NewCommentDraft | null>(null);
	const isAddingComment = ref(false);
	const isRangeSaving = ref(false);

	function getCallDurationSec(): number {
		return Math.round(getPlayer()?.getDuration() ?? 0);
	}

	function openAddNote() {
		const selectedRange = regions.getDraftRange();
		const cursorSec = annotationSecondsToInt(getPlayer()?.getCurrentTime());
		const startSec = selectedRange ? selectedRange.startSec : cursorSec;
		const endSec = selectedRange ? selectedRange.endSec : cursorSec;

		newComment.value = {
			fileId: currentFileId.value,
			startSec: String(startSec),
			endSec: String(endSec),
			note: '',
		};
	}

	function closeAddNote() {
		newComment.value = null;
		regions.clearDraftSelectionRegions();
	}

	async function addComment(draft: CommentFormDraft) {
		isAddingComment.value = true;
		const isSaved = await saveComment(draft);
		isAddingComment.value = false;

		if (isSaved) {
			closeAddNote();
		}
	}

	function saveCommentNote(comment: WaveAnnotation, note: string) {
		return saveComment(
			{
				...comment,
				note,
			},
			{
				errorText: t('webitelUI.callVisualization.errorEditing'),
			},
		);
	}

	// A note being added and a range being edited would both own the draft selection.
	function startCommentRangeEdit(comment: WaveAnnotation) {
		closeAddNote();
		regions.startRangeEdit(comment);
	}

	async function saveCommentRange() {
		const comment = regions.rangeEditComment.value;
		const newRange = regions.getRangeEditValue();
		if (!comment || !newRange) {
			return;
		}

		isRangeSaving.value = true;
		const isSaved = await saveComment(
			{
				...comment,
				...newRange,
			},
			{
				successText: t('webitelUI.callVisualization.editSuccessful'),
				errorText: t('webitelUI.callVisualization.errorEditing'),
			},
		);
		isRangeSaving.value = false;

		if (isSaved) {
			regions.stopRangeEdit();
		}
	}

	function askCommentDeleteConfirmation(comment: WaveAnnotation) {
		deleteConfirmation.askDeleteConfirmation({
			deleted: comment,
			callback: () => deleteComment(comment),
		});
	}

	function resetCommentActions() {
		regions.stopRangeEdit();
		closeAddNote();
	}

	return {
		newComment,
		isAddingComment,
		isRangeSaving,
		deleteConfirmation,
		getCallDurationSec,
		openAddNote,
		closeAddNote,
		addComment,
		saveCommentNote,
		startCommentRangeEdit,
		saveCommentRange,
		askCommentDeleteConfirmation,
		resetCommentActions,
	};
}
