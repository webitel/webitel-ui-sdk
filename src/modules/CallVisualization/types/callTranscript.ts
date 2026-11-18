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

interface CallTranscriptParty {
	name?: string;
	number?: string;
	destination?: string;
}

export interface CallTranscriptCall {
	createdAt?: string;
	from?: CallTranscriptParty;
	to?: CallTranscriptParty;
}
