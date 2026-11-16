/**
 * [Claude] Free (open source) TinyMCE plugins bundled with `wt-rich-text-editor`:
 * `loadTinyMce` loads every one of them, so any can be passed to its `plugins` prop.
 * Premium plugins are not bundled.
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
	// [Claude] TODO: add MERGE_TAGS ('mergetags', premium) once a commercial license is in place
} as const;

export type RichTextEditorPlugin =
	(typeof RichTextEditorPlugin)[keyof typeof RichTextEditorPlugin];
