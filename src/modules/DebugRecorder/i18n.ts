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

// the SDK i18n does not follow the app's locale: take it from storage, like reloadOnStaleChunk
export function currentLocale(): string {
	try {
		return localStorage.getItem('lang') || 'en';
	} catch {
		return 'en';
	}
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
