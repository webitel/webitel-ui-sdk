export const FormatDateMode = {
	DATE: 'date',
	TIME: 'time',
	TIME_SEC: 'timeSec',
	DATETIME: 'datetime',
	DATETIME_SHORT: 'datetimeShort',
} as const;

export type FormatDateMode =
	(typeof FormatDateMode)[keyof typeof FormatDateMode];
