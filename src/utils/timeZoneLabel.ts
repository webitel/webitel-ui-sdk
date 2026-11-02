import { formatInTimeZone } from 'date-fns-tz';

const OFFSET_SUFFIX = /\s[+-]?\d{2}:\d{2}$/;

export function formatTimeZoneLabel(
	timeZone: string,
	date: Date = new Date(),
): string {
	if (!timeZone || OFFSET_SUFFIX.test(timeZone)) return timeZone;

	try {
		const offset = formatInTimeZone(date, timeZone, 'xxx').replace(/^\+/, '');
		return `${timeZone} ${offset}`;
	} catch {
		return timeZone;
	}
}
