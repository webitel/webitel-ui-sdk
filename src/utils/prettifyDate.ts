import { FormatDateMode } from '../enums';
import { formatDate } from './formatDate';

export function prettifyDate(
	timestamp: string | number,
	timezone?: string,
): string {
	const value = Number(timestamp);
	if (!value) return '';

	return formatDate(new Date(value), FormatDateMode.DATETIME_SHORT, {
		timezone,
	});
}
