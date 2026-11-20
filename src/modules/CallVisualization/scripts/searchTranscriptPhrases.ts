import { escapeRegExp } from 'lodash-es';

import type {
	CallTranscriptPhrasePart,
	CallTranscriptRow,
} from '../types/callTranscript';

interface SearchTranscriptPhrasesParams {
	rows: CallTranscriptRow[];
	query: string;
}

const splitPhrase = (
	phrase: string,
	pattern: RegExp,
): CallTranscriptPhrasePart[] =>
	phrase
		.split(pattern)
		.map((text, index) => ({
			text,
			isMatch: index % 2 === 1,
		}))
		.filter(({ text }) => text);

export const searchTranscriptPhrases = ({
	rows,
	query,
}: SearchTranscriptPhrasesParams) => {
	const normalizedQuery = query.trim();
	const pattern = new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'i');
	const rowsWithMatches = normalizedQuery
		? rows.filter(({ phrase }) => phrase && pattern.test(phrase))
		: [];
	const partsByRow = new Map<CallTranscriptRow, CallTranscriptPhrasePart[]>(
		rowsWithMatches.map((row) => [
			row,
			splitPhrase(row.phrase ?? '', pattern),
		]),
	);
	const matches = [
		...partsByRow.values(),
	]
		.flat()
		.filter(({ isMatch }) => isMatch);
	matches.forEach((part, index) => {
		part.matchIndex = index;
	});
	return {
		partsByRow,
		matchesCount: matches.length,
	};
};
