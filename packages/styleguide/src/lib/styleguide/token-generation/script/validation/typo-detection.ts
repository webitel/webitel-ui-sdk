/** Words that carry structural meaning (drive theme-awareness, grouping, etc.);
 * a sibling group name that's a near-miss of one of these is almost always a typo. */
export const STRUCTURAL_KEYWORDS = [
	'Colors',
	'Sizes',
];

export interface TypoFinding {
	name: string;
	keyword: string;
	distance: number;
}

/** Levenshtein edit distance between two strings (case-insensitive). */
export function editDistance(a: string, b: string): number {
	a = a.toLowerCase();
	b = b.toLowerCase();
	const dp: number[][] = Array.from(
		{
			length: a.length + 1,
		},
		(_, i) =>
			[
				i,
			].concat(Array(b.length).fill(0)),
	);
	for (let j = 0; j <= b.length; j++) dp[0][j] = j;
	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			dp[i][j] =
				a[i - 1] === b[j - 1]
					? dp[i - 1][j - 1]
					: 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
		}
	}
	return dp[a.length][b.length];
}

/** Detect group names among `names` that look like typos of a structural keyword
 * (close edit distance, but not an exact/case-insensitive match). Only meant to be
 * called with the names of *group* children (never leaf token names) - "color" or
 * "size" as an actual property name is common and not a typo of "Colors"/"Sizes". */
export function findTypoLikeNames(names: string[]): TypoFinding[] {
	const findings: TypoFinding[] = [];
	for (const name of names) {
		for (const keyword of STRUCTURAL_KEYWORDS) {
			if (name.toLowerCase() === keyword.toLowerCase()) continue;
			const distance = editDistance(name, keyword);
			if (
				distance > 0 &&
				distance <= 2 &&
				Math.abs(name.length - keyword.length) <= 2
			) {
				findings.push({
					name,
					keyword,
					distance,
				});
				break;
			}
		}
	}
	return findings;
}
