import { computed, ref } from 'vue';

import {
	COMMENT_MARKER_SIZE_PX,
	useCallWaveCommentMarkers,
} from '../useCallWaveCommentMarkers';

const layoutMock = ({ scroll = 0 } = {}) => ({
	durationSec: 100,
	waveformWidthPx: 1000,
	visibleWidthPx: 1000,
	scrollPx: scroll,
});

const getMarkers = (annotations, layout = layoutMock()) =>
	useCallWaveCommentMarkers(
		ref(layout),
		computed(() => annotations),
	).markers.value;

describe('useCallWaveCommentMarkers', () => {
	it('places an avatar at the comment start', () => {
		const [marker] = getMarkers([
			{
				id: '1',
				startSec: 10,
				endSec: 20,
			},
		]);
		expect(marker.leftPx).toBe(100);
	});

	it('shifts comments on the same moment instead of stacking them', () => {
		const markers = getMarkers([
			{
				id: '1',
				startSec: 10,
				endSec: 20,
			},
			{
				id: '2',
				startSec: 10,
				endSec: 15,
			},
		]);
		expect(markers.map(({ leftPx }) => leftPx)).toEqual([
			100,
			100 + COMMENT_MARKER_SIZE_PX + 4,
		]);
	});

	it('keeps an avatar of a comment at the very end inside the waveform', () => {
		const [marker] = getMarkers([
			{
				id: '1',
				startSec: 100,
				endSec: 100,
			},
		]);
		expect(marker.leftPx).toBe(1000 - COMMENT_MARKER_SIZE_PX);
	});

	it('hides avatars scrolled out of the visible part of the waveform', () => {
		const markers = getMarkers(
			[
				{
					id: '1',
					startSec: 1,
					endSec: 2,
				},
			],
			layoutMock({
				scroll: 500,
			}),
		);
		expect(markers).toEqual([]);
	});
});
