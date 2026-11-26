import type { Ref } from 'vue';
import { ref } from 'vue';
import type WaveSurfer from 'wavesurfer.js';
import type RegionsPlugin from 'wavesurfer.js/plugins/regions';
import type { Region, RegionParams } from 'wavesurfer.js/plugins/regions';
import { getIconFromRepository } from '../../../assets/icons';

import type { CallWaveCallRecord, WaveAnnotation } from '../types/callWave';
import { getCallHoldsOnWaveform } from './holdTimelinePosition';
import { annotationSecondsToInt } from './useCallWaveAnnotations';

const COMMENT_REGION_ID_PREFIX = 'comment-';
const HOLD_REGION_ID_PREFIX = 'hold-';
const COMMENT_HIGHLIGHT_REGION_ID = `${COMMENT_REGION_ID_PREFIX}highlight`;
const COMMENT_RANGE_EDIT_REGION_ID = `${COMMENT_REGION_ID_PREFIX}range-edit`;

// Color tokens have no hsl-channel twins, so region transparency is mixed in.
const HOLD_RANGE_COLOR =
	'color-mix(in srgb, var(--call-wave-hold-color) 20%, transparent)';
const COMMENT_REGION_COLOR =
	'color-mix(in srgb, var(--call-wave-comment-color) 20%, transparent)';
// Zero-length regions are drawn as a thin line, so they need a solid color to be seen.
const HOLD_POINT_COLOR = 'var(--call-wave-hold-color)';
const COMMENT_MARKER_COLOR = 'var(--call-wave-comment-color)';
const UNSAVED_COMMENT_BORDER = '1px solid var(--call-wave-comment-color)';

interface SecondsRange {
	startSec: number;
	endSec: number;
}

export interface UseCallWaveRegionsOptions {
	regionsPlugin: RegionsPlugin;
	getPlayer: () => WaveSurfer | null | undefined;
	call: Ref<CallWaveCallRecord>;
}

function hasIdPrefix(region: Region, prefix: string): boolean {
	return region.id.startsWith(prefix);
}

function isDraftRegion(region: Region): boolean {
	return (
		!hasIdPrefix(region, COMMENT_REGION_ID_PREFIX) &&
		!hasIdPrefix(region, HOLD_REGION_ID_PREFIX)
	);
}

// Resize handles live in the wavesurfer shadow DOM, so their icons are put in directly instead of a wt-icon.
const RESIZE_HANDLE_ICONS = {
	'region-handle-left': 'pgt-first',
	'region-handle-right': 'pgt-last',
};

function addResizeHandleIcons(region: Region) {
	Object.entries(RESIZE_HANDLE_ICONS).forEach(([handlePart, iconName]) => {
		const handle = region.element?.querySelector(`[part~="${handlePart}"]`);
		const icon = getIconFromRepository(iconName);
		if (!handle || !icon) {
			return;
		}
		handle.innerHTML = icon;
		const svg = handle.querySelector('svg');
		svg?.setAttribute('fill', 'currentColor');
		svg?.setAttribute('width', '100%');
		svg?.setAttribute('height', '100%');
	});
}

function toSecondsRange(region: Region): SecondsRange {
	return {
		startSec: annotationSecondsToInt(region.start),
		endSec: annotationSecondsToInt(region.end),
	};
}

function commentRange(comment: WaveAnnotation) {
	const start = annotationSecondsToInt(comment.startSec);
	const end = annotationSecondsToInt(comment.endSec);
	return {
		start,
		end: Math.max(end, start),
	};
}

// A zero-length region has no resize handles, so a point comment is edited as a 1s range.
function toEditableRange(
	range: {
		start: number;
		end: number;
	},
	durationSec: number,
) {
	const hasLength = range.end > range.start;
	if (hasLength) {
		return range;
	}
	const isAtTheEnd = range.start + 1 > durationSec;
	if (isAtTheEnd) {
		return {
			start: Math.max(durationSec - 1, 0),
			end: durationSec,
		};
	}
	return {
		start: range.start,
		end: range.start + 1,
	};
}

export function useCallWaveRegions({
	regionsPlugin,
	getPlayer,
	call,
}: UseCallWaveRegionsOptions) {
	const showHolds = ref(false);
	const showComments = ref(false);
	const rangeEditComment = ref<WaveAnnotation | null>(null);
	const isRangeChanged = ref(false);

	let dragSelectionCleanup: (() => void) | null = null;
	let rangeEditRegion: Region | null = null;

	function removeRegions(predicate: (region: Region) => boolean) {
		regionsPlugin
			.getRegions()
			.filter(predicate)
			.forEach((region) => {
				region.remove();
			});
	}

	// Read-only regions must let drag-selection and seeking through to the waveform underneath.
	function addPassiveRegion(options: RegionParams) {
		const region = regionsPlugin.addRegion({
			...options,
			resize: false,
			drag: false,
		});
		region.element?.style.setProperty('pointer-events', 'none');
		return region;
	}

	function enableDragSelection() {
		dragSelectionCleanup?.();
		dragSelectionCleanup = regionsPlugin.enableDragSelection({
			color: COMMENT_REGION_COLOR,
			resize: true,
		});
	}

	function getDraftRegion(): Region | undefined {
		return regionsPlugin.getRegions().find(isDraftRegion);
	}

	function clearDraftSelectionRegions() {
		removeRegions(isDraftRegion);
	}

	function onRegionCreated(newRegion: Region) {
		if (!isDraftRegion(newRegion)) {
			return;
		}
		const isEmptySelection = newRegion.start === newRegion.end;
		if (isEmptySelection) {
			newRegion.remove();
			return;
		}
		const previousDrafts = regionsPlugin
			.getRegions()
			.filter((region) => isDraftRegion(region) && region !== newRegion);
		previousDrafts.forEach((region) => {
			region.remove();
		});
	}

	// Fired as soon as a region exists, also at the start of a drag-selection, unlike `region-created`.
	function onRegionInitialized(region: Region) {
		addResizeHandleIcons(region);
		const isCommentInEditing =
			isDraftRegion(region) || region.id === COMMENT_RANGE_EDIT_REGION_ID;
		if (isCommentInEditing && region.element) {
			region.element.style.borderLeft = UNSAVED_COMMENT_BORDER;
			region.element.style.borderRight = UNSAVED_COMMENT_BORDER;
		}
	}

	function attachDraftSelection() {
		enableDragSelection();
		const unsubscribeRegionInitialized = regionsPlugin.on(
			'region-initialized',
			onRegionInitialized,
		);
		const unsubscribeRegionCreated = regionsPlugin.on(
			'region-created',
			onRegionCreated,
		);
		return () => {
			unsubscribeRegionInitialized();
			unsubscribeRegionCreated();
			dragSelectionCleanup?.();
			dragSelectionCleanup = null;
		};
	}

	function getDraftRange(): SecondsRange | null {
		const draftRegion = getDraftRegion();
		return draftRegion ? toSecondsRange(draftRegion) : null;
	}

	function updateDraftSelectionRange(startSec: number, endSec: number) {
		const start = Math.min(startSec, endSec);
		const end = Math.max(startSec, endSec);
		const draftRegion = getDraftRegion();
		if (draftRegion) {
			draftRegion.setOptions({
				start,
				end,
			});
			return;
		}
		if (start !== end) {
			addPassiveRegion({
				start,
				end,
				color: COMMENT_REGION_COLOR,
			});
		}
	}

	function renderHoldsLayer() {
		removeRegions((region) => hasIdPrefix(region, HOLD_REGION_ID_PREFIX));
		// While a comment range is edited, it is the only thing drawn on the waveform.
		if (!showHolds.value || rangeEditComment.value) {
			return;
		}
		const durationSec = getPlayer()?.getDuration() ?? 0;
		getCallHoldsOnWaveform(call.value, durationSec).forEach(
			({ start, end }, index) => {
				const isPoint = start === end;
				addPassiveRegion({
					id: `${HOLD_REGION_ID_PREFIX}${index}`,
					start,
					end,
					color: isPoint ? HOLD_POINT_COLOR : HOLD_RANGE_COLOR,
				});
			},
		);
	}

	function setCommentHighlight(comment: WaveAnnotation | null) {
		removeRegions((region) => region.id === COMMENT_HIGHLIGHT_REGION_ID);
		if (!comment) {
			return;
		}
		const range = commentRange(comment);
		addPassiveRegion({
			id: COMMENT_HIGHLIGHT_REGION_ID,
			...range,
			color:
				range.start === range.end ? COMMENT_MARKER_COLOR : COMMENT_REGION_COLOR,
		});
	}

	function startRangeEdit(comment: WaveAnnotation) {
		setCommentHighlight(null);
		clearDraftSelectionRegions();
		dragSelectionCleanup?.();
		rangeEditComment.value = comment;
		isRangeChanged.value = false;
		renderHoldsLayer();

		const savedRange = commentRange(comment);
		const durationSec = getPlayer()?.getDuration() ?? savedRange.end;
		const region = regionsPlugin.addRegion({
			id: COMMENT_RANGE_EDIT_REGION_ID,
			...toEditableRange(savedRange, durationSec),
			color: COMMENT_REGION_COLOR,
			minLength: 1,
			resize: true,
			drag: true,
		});
		region.on('update-end', () => {
			const { startSec, endSec } = toSecondsRange(region);
			const isSameAsSaved =
				startSec === savedRange.start && endSec === savedRange.end;
			isRangeChanged.value = !isSameAsSaved;
		});
		rangeEditRegion = region;
	}

	function getRangeEditValue(): SecondsRange | null {
		return rangeEditRegion ? toSecondsRange(rangeEditRegion) : null;
	}

	function stopRangeEdit() {
		if (!rangeEditComment.value) {
			return;
		}
		rangeEditRegion?.remove();
		rangeEditRegion = null;
		rangeEditComment.value = null;
		isRangeChanged.value = false;
		renderHoldsLayer();
		enableDragSelection();
	}

	function toggleComments() {
		showComments.value = !showComments.value;
		if (!showComments.value) {
			setCommentHighlight(null);
		}
	}

	function toggleHolds() {
		showHolds.value = !showHolds.value;
		renderHoldsLayer();
	}

	return {
		showHolds,
		showComments,
		rangeEditComment,
		isRangeChanged,
		toggleHolds,
		toggleComments,
		renderHoldsLayer,
		attachDraftSelection,
		getDraftRange,
		clearDraftSelectionRegions,
		updateDraftSelectionRange,
		setCommentHighlight,
		startRangeEdit,
		getRangeEditValue,
		stopRangeEdit,
	};
}
