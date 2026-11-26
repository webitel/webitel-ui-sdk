import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { CallDirection } from 'webitel-sdk';

import type {
	CallAudioFileSlice,
	CallHoldItem,
	CallWaveCallRecord,
} from '../types/callWave';
import { CallFileStartRecord } from '../types/callWave';

// API timestamp → finite epoch ms or null.
function toEpochMs(value: unknown): number | null {
	const num = Number(value);
	return Number.isFinite(num) ? num : null;
}

function holdDurationMs(hold: CallHoldItem): number {
	const durationMs = Number(hold.stop) - Number(hold.start);
	if (Number.isFinite(durationMs)) {
		return Math.max(0, durationMs);
	}
	return Math.max(0, Number(hold.sec) || 0) * 1000;
}

// Sum of hold lengths before the current index (outbound excision offset).
function totalDurationMs(holds: CallHoldItem[]): number {
	return holds.reduce((ms, hold) => ms + holdDurationMs(hold), 0);
}

// Keep marker inside [0, file duration].
function clampToFile(seconds: number, fileDurationSec: number): number {
	return Math.min(Math.max(seconds, 0), fileDurationSec);
}

// One hold → second on the waveform (with file window clamp).
function holdMarkerSec(
	holdStartMs: number,
	waveformStartMs: number,
	previousHoldsMs: number,
	audioFile: CallAudioFileSlice,
	fileDurationSec: number,
): number {
	if (holdStartMs < Number(audioFile.startAt)) {
		return 0;
	}
	if (holdStartMs >= Number(audioFile.stopAt)) {
		return fileDurationSec;
	}

	return clampToFile(
		(holdStartMs - waveformStartMs - previousHoldsMs) / 1000,
		fileDurationSec,
	);
}

// Talk start when answeredAt is missing: createdAt + (duration − billSec).
function estimatedTalkStartMs(
	createdAtMs: number,
	durationSec: number | null,
	billSec: number | null,
): number | null {
	if (durationSec == null || billSec == null || durationSec <= billSec) {
		return null;
	}
	return createdAtMs + (durationSec - billSec) * 1000;
}

// Outbound recording from the agent side, not the client/dialer leg.
function isOutboundOperatorRecording(
	call: CallWaveCallRecord,
	audioFile: CallAudioFileSlice,
): boolean {
	return (
		call.direction === CallDirection.Outbound &&
		audioFile.startRecord !== CallFileStartRecord.Client
	);
}

// Epoch ms that maps to 0:00 on the waveform (connection time, varies by direction).
function waveformStartMs(
	call: CallWaveCallRecord,
	audioFile: CallAudioFileSlice,
): number {
	const times = call.timestamps ?? {};
	const createdAtMs = toEpochMs(times.createdAt) ?? 0;
	const answeredAtMs = toEpochMs(times.answeredAt);
	const bridgedAtMs = toEpochMs(times.bridgedAt);
	const queueBridgedAtMs = toEpochMs(times.queueBridgedAt);
	const talkStartMs = estimatedTalkStartMs(
		createdAtMs,
		toEpochMs(times.duration),
		toEpochMs(times.billSec),
	);

	if (isOutboundOperatorRecording(call, audioFile)) {
		return answeredAtMs ?? talkStartMs ?? bridgedAtMs ?? createdAtMs;
	}

	return (
		queueBridgedAtMs ??
		answeredAtMs ??
		bridgedAtMs ??
		talkStartMs ??
		createdAtMs
	);
}

// Outbound recordings have the hold music cut out, inbound ones keep it.
function isHoldCutFromRecording(call: CallWaveCallRecord): boolean {
	return call.direction === CallDirection.Outbound;
}

// All hold starts → waveform seconds for the selected audio file.
function mapHoldsToWaveformSeconds(
	holds: CallHoldItem[],
	call: CallWaveCallRecord,
	audioFile: CallAudioFileSlice,
	fileDurationSec: number,
): number[] {
	const waveformStartedAtMs = waveformStartMs(call, audioFile);
	// Each cut-out hold moves everything after it to the left by its length.
	const subtractPreviousHolds = isHoldCutFromRecording(call);

	return holds.map((hold, index) =>
		holdMarkerSec(
			Number(hold.start),
			waveformStartedAtMs,
			subtractPreviousHolds ? totalDurationMs(holds.slice(0, index)) : 0,
			audioFile,
			fileDurationSec,
		),
	);
}

export interface HoldOnWaveform {
	start: number;
	end: number;
	holdSec: number;
}

export function mapHoldsToWaveformRanges(
	holds: CallHoldItem[],
	call: CallWaveCallRecord,
	audioFile: CallAudioFileSlice,
	fileDurationSec: number,
): HoldOnWaveform[] {
	const startPositionsSec = mapHoldsToWaveformSeconds(
		holds,
		call,
		audioFile,
		fileDurationSec,
	);
	const isPoint = isHoldCutFromRecording(call);

	return holds.map((hold, index) => {
		const start = startPositionsSec[index];
		const holdSec = holdDurationMs(hold) / 1000;
		const end = isPoint ? start : clampToFile(start + holdSec, fileDurationSec);
		return {
			start,
			end,
			holdSec,
		};
	});
}

export function getCallHoldsOnWaveform(
	call: CallWaveCallRecord,
	fileDurationSec: number,
): HoldOnWaveform[] {
	const audioFile = call.files?.[EngineCallFileType.FileTypeAudio]?.[0];
	if (!call.hold?.length || !audioFile || !fileDurationSec) {
		return [];
	}
	return mapHoldsToWaveformRanges(call.hold, call, audioFile, fileDurationSec);
}
