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
