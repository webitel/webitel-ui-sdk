/**
 * Loads TinyMCE (self-hosted) once, core first.
 *
 * The icons, model, theme and plugins register themselves on the global
 * `tinymce` the core sets, so the core must run before any of them. Plain
 * side-effect imports do not guarantee that: in an app's production build
 * the core — it touches `module` — ends up behind a lazy CommonJS wrapper,
 * while the add-ons, plain IIFEs, are hoisted and run first, failing with
 * "tinymce is not defined". Awaiting the core's import pins the order.
 */
import type { TinyMCE } from 'tinymce';

let loading: Promise<void> | null = null;

export function loadTinyMce(): Promise<void> {
	loading ??= import('tinymce/tinymce').then(() =>
		Promise.all([
			import('tinymce/icons/default'),
			import('tinymce/models/dom'),
			import('tinymce/themes/silver'),
			// [Claude] Every plugin in the RichTextEditorPlugin enum; keep the two in sync
			import('tinymce/plugins/accordion'),
			import('tinymce/plugins/advlist'),
			import('tinymce/plugins/anchor'),
			import('tinymce/plugins/charmap'),
			import('tinymce/plugins/code'),
			import('tinymce/plugins/codesample'),
			import('tinymce/plugins/directionality'),
			import('tinymce/plugins/emoticons'),
			import('tinymce/plugins/emoticons/js/emojis'),
			import('tinymce/plugins/fullscreen'),
			import('tinymce/plugins/image'),
			import('tinymce/plugins/insertdatetime'),
			import('tinymce/plugins/link'),
			import('tinymce/plugins/lists'),
			import('tinymce/plugins/media'),
			import('tinymce/plugins/nonbreaking'),
			import('tinymce/plugins/preview'),
			import('tinymce/plugins/searchreplace'),
			import('tinymce/plugins/table'),
			// [Claude] Our own plugin (`${name}` variables), registered on the same global
			import('./plugins/variables'),
			// [Claude] Skins and content styles register as TinyMCE resources, so
			// `skin` / `content_css` load them from memory instead of fetching by URL
			import('tinymce/skins/ui/oxide/skin.js'),
			import('tinymce/skins/ui/oxide/content.js'),
			import('tinymce/skins/ui/oxide-dark/skin.js'),
			import('tinymce/skins/ui/oxide-dark/content.js'),
			import('tinymce/skins/content/default/content.js'),
			import('tinymce/skins/content/dark/content.js'),
		]).then(() => undefined),
	);
	return loading;
}

type LanguagePack = {
	default: Record<string, string>;
};

/**
 * [Claude] TinyMCE language packs (see ./langs), loaded on demand. English is
 * TinyMCE's own, so it has none.
 */
const LANGUAGE_PACKS: Record<string, () => Promise<LanguagePack>> = {
	es: () => import('./langs/es'),
	kk: () => import('./langs/kk'),
	pl: () => import('./langs/pl'),
	ro: () => import('./langs/ro'),
	ru: () => import('./langs/ru'),
	uk: () => import('./langs/uk'),
	uz: () => import('./langs/uz'),
	vi: () => import('./langs/vi'),
};

// [Claude] TinyMCE shows an empty translation as an empty label; packs leave untranslated
// strings empty, so they are left out and fall back to English
function registerLanguage(
	language: string,
	translations: Record<string, string>,
) {
	const { tinymce } = window as unknown as {
		tinymce?: TinyMCE;
	};
	tinymce?.addI18n(
		language,
		Object.fromEntries(
			Object.entries(translations).filter(([, text]) => text !== ''),
		),
	);
}

// [Claude] the apps' locale codes that differ from TinyMCE's
const LOCALE_TO_LANGUAGE: Record<string, string> = {
	kz: 'kk',
};

/**
 * [Claude] The TinyMCE language for an app locale (`uk`, `kz`, `en-US`…), or
 * null for English and anything without a pack.
 */
export function toTinyMceLanguage(locale: string | undefined): string | null {
	const code = (locale ?? '').toLowerCase().split(/[-_]/)[0];
	const language = LOCALE_TO_LANGUAGE[code] ?? code;
	return language in LANGUAGE_PACKS ? language : null;
}

const languageLoading = new Map<string, Promise<void>>();

/**
 * [Claude] Loads TinyMCE and, unless it is English (null), the language pack;
 * each pack once.
 */
export function loadTinyMceLanguage(language: string | null): Promise<void> {
	if (!language) return loadTinyMce();
	let pending = languageLoading.get(language);
	if (!pending) {
		pending = loadTinyMce()
			.then(() => LANGUAGE_PACKS[language]?.())
			.then((pack) => {
				if (pack) registerLanguage(language, pack.default);
			});
		languageLoading.set(language, pending);
	}
	return pending;
}
