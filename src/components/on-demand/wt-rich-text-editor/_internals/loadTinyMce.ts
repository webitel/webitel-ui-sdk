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
			import('tinymce/plugins/advlist'),
			import('tinymce/plugins/emoticons'),
			import('tinymce/plugins/emoticons/js/emojis'),
			import('tinymce/plugins/fullscreen'),
			import('tinymce/plugins/image'),
			import('tinymce/plugins/link'),
			import('tinymce/plugins/lists'),
			import('tinymce/plugins/table'),
			import('tinymce/skins/ui/oxide/skin.css'),
		]).then(() => undefined),
	);
	return loading;
}
