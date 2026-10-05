import { getUserTimeZone } from '@webitel/api-services/utils';
import { isSameDay, isSameYear } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

/** App locale codes that are not BCP 47 tags `Intl` understands. */
const INTL_LOCALE_ALIASES: Record<string, string> = {
	kz: 'kk',
	ua: 'uk',
};

const toIntlLocale = (locale: string) => {
	const candidate = INTL_LOCALE_ALIASES[locale] ?? locale;
	try {
		return Intl.DateTimeFormat.supportedLocalesOf(candidate).length
			? candidate
			: 'en';
	} catch {
		return 'en';
	}
};

/**
 * Whether two instants fall on the same calendar day in `timeZone` — the
 * operator's setting by default, the one the rest of the app formats with.
 */
export const isSameDayInZone = (
	a: number,
	b: number,
	timeZone: string = getUserTimeZone(),
): boolean => isSameDay(toZonedTime(a, timeZone), toZonedTime(b, timeZone));

/** "Today" · "September 15" · "September 15, 2025" (AC_03.02.02). */
export const formatDividerDate = (
	timestamp: number,
	{
		locale,
		todayLabel,
		now = Date.now(),
		timeZone = getUserTimeZone(),
	}: {
		locale: string;
		todayLabel: string;
		now?: number;
		timeZone?: string;
	},
): string => {
	if (isSameDayInZone(timestamp, now, timeZone)) return todayLabel;

	const isThisYear = isSameYear(
		toZonedTime(timestamp, timeZone),
		toZonedTime(now, timeZone),
	);

	// Intl, not date-fns format: it has month names for every app locale
	return new Intl.DateTimeFormat(toIntlLocale(locale), {
		timeZone,
		month: 'long',
		day: 'numeric',
		...(isThisYear
			? {}
			: {
					year: 'numeric',
				}),
	}).format(timestamp);
};

/**
 * 24h "HH:mm", as in DES-730, in the operator's time zone. Not the shared
 * formatDate 'time' mode: its uk 'p' pattern drops the leading zero ("9:05").
 */
export const formatMessageTime = (
	timestamp: number,
	timeZone: string = getUserTimeZone(),
): string => formatInTimeZone(timestamp, timeZone, 'HH:mm');
