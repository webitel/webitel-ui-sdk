import { mapHoldsToWaveformRanges } from '../holdTimelinePosition';

const call = {
	direction: 'inbound',
	timestamps: {
		createdAt: 0,
		queueBridgedAt: 1000,
	},
};
const audioFile = {
	startAt: 1000,
	stopAt: 101000,
};
const FILE_DURATION_SEC = 100;

const mapHolds = (holds) =>
	mapHoldsToWaveformRanges(holds, call, audioFile, FILE_DURATION_SEC);

describe('mapHoldsToWaveformRanges', () => {
	it('draws a hold from its start to its stop', () => {
		expect(
			mapHolds([
				{
					start: 11000,
					stop: 21000,
				},
			]),
		).toEqual([
			{
				start: 10,
				end: 20,
				holdSec: 10,
			},
		]);
	});

	it('uses hold seconds when the hold has no stop time', () => {
		expect(
			mapHolds([
				{
					start: 31000,
					sec: 5,
				},
			]),
		).toEqual([
			{
				start: 30,
				end: 35,
				holdSec: 5,
			},
		]);
	});

	it('cuts a hold that lasts past the end of the file', () => {
		expect(
			mapHolds([
				{
					start: 96000,
					stop: 200000,
				},
			]),
		).toEqual([
			{
				start: 95,
				end: FILE_DURATION_SEC,
				holdSec: 104,
			},
		]);
	});

	it('draws an outbound hold as a point, because its music is cut out of the recording', () => {
		const outboundCall = {
			direction: 'outbound',
			timestamps: {
				createdAt: 0,
				answeredAt: 1000,
			},
		};
		expect(
			mapHoldsToWaveformRanges(
				[
					{
						start: 11000,
						stop: 21000,
					},
					{
						start: 41000,
						stop: 46000,
					},
				],
				outboundCall,
				audioFile,
				FILE_DURATION_SEC,
			),
		).toEqual([
			{
				start: 10,
				end: 10,
				holdSec: 10,
			},
			{
				start: 30,
				end: 30,
				holdSec: 5,
			},
		]);
	});
});
