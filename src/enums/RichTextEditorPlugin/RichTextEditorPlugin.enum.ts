/**
 * [Claude] TinyMCE plugins bundled with `wt-rich-text-editor`: the free (open source)
 * ones plus our own (`VARIABLES`). `loadTinyMce` loads every one of them, so any
 * can be passed to its `plugins` prop. Premium plugins are not bundled.
 */
export const RichTextEditorPlugin = {
	ACCORDION: 'accordion',
	ADV_LIST: 'advlist',
	ANCHOR: 'anchor',
	CHAR_MAP: 'charmap',
	CODE: 'code', // [Claude] Source code (HTML); meant for the admin Email Templates only
	CODE_SAMPLE: 'codesample',
	DIRECTIONALITY: 'directionality',
	EMOTICONS: 'emoticons',
	FULLSCREEN: 'fullscreen',
	IMAGE: 'image',
	INSERT_DATETIME: 'insertdatetime',
	LINK: 'link',
	LISTS: 'lists',
	MEDIA: 'media',
	NONBREAKING: 'nonbreaking',
	PREVIEW: 'preview',
	SEARCH_REPLACE: 'searchreplace',
	TABLE: 'table',
	VARIABLES: 'wtvariables', // [Claude] our own plugin: `${name}` variables, see _internals/plugins/variables
} as const;

export type RichTextEditorPlugin =
	(typeof RichTextEditorPlugin)[keyof typeof RichTextEditorPlugin];
