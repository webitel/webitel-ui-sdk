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

const isSameLocalDay = (a: Date, b: Date) =>
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate();

/** "Today" · "September 15" · "September 15, 2025" (AC_03.02.02). */
export const formatDividerDate = (
	timestamp: number,
	{
		locale,
		todayLabel,
		now = Date.now(),
	}: {
		locale: string;
		todayLabel: string;
		now?: number;
	},
): string => {
	const date = new Date(timestamp);
	const today = new Date(now);

	if (isSameLocalDay(date, today)) return todayLabel;

	return new Intl.DateTimeFormat(toIntlLocale(locale), {
		month: 'long',
		day: 'numeric',
		...(date.getFullYear() === today.getFullYear()
			? {}
			: {
					year: 'numeric',
				}),
	}).format(date);
};

/** 24h "HH:mm", as in Figma. */
export const formatMessageTime = (timestamp: number, locale: string): string =>
	new Intl.DateTimeFormat(toIntlLocale(locale), {
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
	}).format(new Date(timestamp));
