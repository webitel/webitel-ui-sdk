/** Backend timestamps are Unix ms as strings; `null` when absent or unusable. */
export const toTimestamp = (
	value: string | number | undefined | null,
): number | null => {
	if (value === undefined || value === null || value === '') return null;
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

/**
 * Per-thread message sequence numbers arrive as strings. Compare them as
 * numbers: as strings, "10" sorts before "9".
 */
export const toSeq = (value: string | undefined): number | null => {
	if (value === undefined || value === '') return null;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : null;
};
