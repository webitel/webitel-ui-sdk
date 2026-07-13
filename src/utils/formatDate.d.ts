import type { FormatDateMode } from '../enums';
export declare function formatDate(
	date: string | number | Date,
	to: (typeof FormatDateMode)[keyof typeof FormatDateMode],
	{
		timezone,
	}?: {
		timezone?: string;
	},
): string;
