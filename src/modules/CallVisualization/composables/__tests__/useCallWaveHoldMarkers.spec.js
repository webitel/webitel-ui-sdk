import { ref } from 'vue';

import {
	HOLD_ICON_SIZE_PX,
	useCallWaveHoldMarkers,
} from '../useCallWaveHoldMarkers';

const layoutMock = ({ scroll = 0 } = {}) => ({
	durationSec: 100,
	waveformWidthPx: 1000,
	visibleWidthPx: 1000,
	scrollPx: scroll,
});

const callMock = (direction) => ({
	direction,
	timestamps: {
		createdAt: 0,
		answeredAt: 1000,
		queueBridgedAt: 1000,
	},
	files: {
		file_type_audio: [
			{
				startAt: 1000,
				stopAt: 101000,
			},
		],
	},
	hold: [
		{
			start: 21000,
			stop: 31000,
		},
	],
});

const getMarkers = (direction, layout = layoutMock()) =>
	useCallWaveHoldMarkers({
		call: ref(callMock(direction)),
		layout: ref(layout),
		durationSec: ref(layout.durationSec),
		showHolds: ref(true),
	}).markers.value;

describe('useCallWaveHoldMarkers', () => {
	it('shows a pause icon with the hold length over an outbound hold', () => {
		expect(getMarkers('outbound')).toEqual([
			{
				key: 'hold-0',
				leftPx: 200 - HOLD_ICON_SIZE_PX - 4,
				durationLabel: '00:00:10',
			},
		]);
	});

	it('has no icon for an inbound hold, which is drawn as a range', () => {
		expect(getMarkers('inbound')).toEqual([]);
	});

	it('hides the icon of a hold scrolled out of view', () => {
		expect(
			getMarkers(
				'outbound',
				layoutMock({
					scroll: 500,
				}),
			),
		).toEqual([]);
	});
});
