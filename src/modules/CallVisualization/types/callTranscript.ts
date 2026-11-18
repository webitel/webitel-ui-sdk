export interface CallTranscriptItem {
	id?: string;
	fileId?: string;
	[key: string]: unknown;
}

export interface CallTranscriptPhrase {
	startSec?: number;
	endSec?: number;
	phrase?: string;
	channel?: number;
}

export interface CallTranscriptRow {
	time: string;
	channel: string | number;
	phrase?: string;
}

export interface CallTranscriptChannel {
	value: string | number;
	show: boolean;
}

interface CallTranscriptParty {
	name?: string;
	number?: string;
	destination?: string;
}

export interface CallTranscriptFileJob {
	fileId?: string;
	state?: string;
}

export interface CallTranscriptCall {
	id?: string;
	createdAt?: string;
	from?: CallTranscriptParty;
	to?: CallTranscriptParty;
	files?: Record<string, unknown[] | undefined>;
	filesJob?: CallTranscriptFileJob[];
	transcripts?: CallTranscriptItem[];
}
