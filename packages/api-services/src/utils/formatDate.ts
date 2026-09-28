import { uk } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

import type { FormatDateMode } from '../enums/FormatDateMode/FormatDateMode';

/**
 * Mirrors @webitel/ui-sdk's Userinfo TIMEZONE_STORAGE_KEY constant —
 * duplicated here rather than imported to avoid a circular dependency
 * (api-services must not depend on ui-sdk). Keep the literal in sync with
 * ui-sdk/src/modules/Userinfo/constants/UserSettingsConstants.ts.
 */
const TIMEZONE_STORAGE_KEY = 'user-timezone-setting';

function getUserTimeZone(): string {
	return (
		localStorage.getItem(TIMEZONE_STORAGE_KEY) ||
		Intl.DateTimeFormat().resolvedOptions().timeZone
	);
}

// https://date-fns.org/v4.1.0/docs/format
const formatStringMap = {
	date: 'P', // dd.MM.yyyy (13.11.2025)
	time: 'p', // HH:mm (15:53)
	timeSec: 'pp', // HH:mm:ss (15:53:00)
	datetime: 'Ppp', // dd.MM.yyyy, HH:mm:ss (13.11.2025, 15:53:00)
	datetimeShort: 'Pp', // dd.MM.yyyy, HH:mm (13.11.2025, 15:53)
};

export function formatDate(
	date: string | number | Date,
	to: (typeof FormatDateMode)[keyof typeof FormatDateMode],
	{
		timezone = undefined,
	}: {
		timezone?: string;
	} = {},
): string {
	const timeZone = timezone ?? getUserTimeZone();

	return formatInTimeZone(date, timeZone, formatStringMap[to], {
		locale: uk,
	});
}
