import type { CallDirection } from 'webitel-sdk';

export interface CallHoldItem {
	start: number;
	stop: number;
	sec?: number;
}

export const CallFileStartRecord = {
	Client: 'client',
	Operator: 'operator',
} as const;

export type CallFileStartRecord =
	(typeof CallFileStartRecord)[keyof typeof CallFileStartRecord];

export const PlaybackRate = {
	X2: 2,
	X1_5: 1.5,
	X0_75: 0.75,
	X0_5: 0.5,
} as const;

export type PlaybackRate = (typeof PlaybackRate)[keyof typeof PlaybackRate];

export interface CallAudioFileSlice {
	startAt: number;
	stopAt: number;
	startRecord?: CallFileStartRecord;
}

export interface CallWaveTimestamps {
	createdAt?: number | string | null;
	answeredAt?: number | string | null;
	bridgedAt?: number | string | null;
	queueBridgedAt?: number | string | null;
	duration?: number | string | null;
	billSec?: number | string | null;
}

export interface CallWaveCallRecord {
	id: string;
	createdAt: string;
	timestamps?: CallWaveTimestamps;
	direction?: CallDirection | string;
	destination?: string;
	hold?: CallHoldItem[];
	files: {
		file_type_audio?: CallAudioFileSlice[];
	} & Record<string, unknown>;
	from: {
		name?: string;
		number?: string;
	};
	to?: {
		name?: string;
		number?: string;
	};
}

export interface WaveAnnotation {
	id?: string;
	fileId?: string;
	note: string;
	startSec: number | string;
	endSec: number | string;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: {
		name?: string;
		id?: string;
	};
	updatedBy?: {
		name?: string;
		id?: string;
	};
}

export interface NewCommentDraft {
	fileId?: string;
	startSec: string;
	endSec: string;
	note: string;
}

export interface CommentFormDraft {
	id?: string;
	fileId?: string;
	note: string;
	startSec: number | string;
	endSec: number | string;
}

export const RangeField = {
	StartSec: 'startSec',
	EndSec: 'endSec',
} as const;

export type RangeField = (typeof RangeField)[keyof typeof RangeField];
