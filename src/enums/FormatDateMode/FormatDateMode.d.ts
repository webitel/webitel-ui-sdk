export declare const FormatDateMode: {
	readonly DATE: 'date';
	readonly TIME: 'time';
	readonly TIME_SEC: 'timeSec';
	readonly DATETIME: 'datetime';
	readonly DATETIME_SHORT: 'datetimeShort';
};
export type FormatDateMode =
	(typeof FormatDateMode)[keyof typeof FormatDateMode];
