import i18n from '../../locale/i18n';

const PREFIX = 'webitelUI.debugRecorder.';

export type DebugRecorderText =
	| 'chipTitle'
	| 'title'
	| 'recordingOn'
	| 'summary'
	| 'download'
	| 'stop'
	| 'confirm'
	| 'confirmDelete'
	| 'cancel'
	| 'preparing'
	| 'deleting'
	| 'failed'
	| 'stopped'
	| 'signInToDownload';

function storedLang(): string | null {
	try {
		return localStorage.getItem('lang');
	} catch {
		return null;
	}
}

// browsers say `kk` for Kazakh, webitel's locale is `kz`
const ALIASES: Record<string, string> = {
	kk: 'kz',
};

/**
 * The SDK i18n does not follow the app's locale: take the one the apps keep in
 * storage (like reloadOnStaleChunk); before an app stored one (sign-in page,
 * first visit), the page's and the browser's languages.
 */
export function currentLocale(): string {
	const available = i18n.global.availableLocales as string[];
	const candidates = [
		storedLang(),
		document.documentElement.lang,
		...(navigator.languages ?? [
			navigator.language,
		]),
	];
	for (const candidate of candidates) {
		if (!candidate) continue;
		const base = candidate.toLowerCase().split('-')[0];
		const locale = ALIASES[base] ?? base;
		if (available.includes(locale)) return locale;
	}
	return 'en';
}

/** BCP 47 tag for dates and numbers: webitel's Kazakh is `kz`, the standard code is `kk` */
export function currentLocaleTag(): string {
	const locale = currentLocale();
	return locale === 'kz' ? 'kk' : locale;
}

export function translate(
	key: DebugRecorderText,
	params: Record<string, string | number> = {},
): string {
	return i18n.global.t(`${PREFIX}${key}`, params, {
		locale: currentLocale() as typeof i18n.global.locale.value,
	});
}
