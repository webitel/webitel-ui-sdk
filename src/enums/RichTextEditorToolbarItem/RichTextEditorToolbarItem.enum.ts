/**
 * [Claude] TinyMCE toolbar buttons used by `wt-rich-text-editor`'s `toolbar` prop.
 * Core buttons need no plugin; the rest need the plugin noted next to them
 * (see `RichTextEditorPlugin`).
 */
export const RichTextEditorToolbarItem = {
	// [Claude] History
	UNDO: 'undo',
	REDO: 'redo',

	// [Claude] Clipboard
	CUT: 'cut',
	COPY: 'copy',
	PASTE: 'paste',
	PASTE_TEXT: 'pastetext',
	SELECT_ALL: 'selectall',

	// [Claude] Blocks and formats (`styles` also holds inline code: Inline → Code)
	BLOCKS: 'blocks',
	STYLES: 'styles',

	// [Claude] Font
	FONT_FAMILY: 'fontfamily',
	FONT_SIZE: 'fontsize',
	LINE_HEIGHT: 'lineheight',

	// [Claude] Inline formatting
	BOLD: 'bold',
	ITALIC: 'italic',
	UNDERLINE: 'underline',
	STRIKETHROUGH: 'strikethrough',
	SUBSCRIPT: 'subscript',
	SUPERSCRIPT: 'superscript',

	// [Claude] Colors
	FORE_COLOR: 'forecolor',
	BACK_COLOR: 'backcolor',
	REMOVE_FORMAT: 'removeformat',

	// [Claude] Alignment, indent and text direction
	ALIGN_LEFT: 'alignleft',
	ALIGN_CENTER: 'aligncenter',
	ALIGN_RIGHT: 'alignright',
	ALIGN_JUSTIFY: 'alignjustify',
	OUTDENT: 'outdent',
	INDENT: 'indent',
	LTR: 'ltr', // [Claude] directionality
	RTL: 'rtl', // [Claude] directionality

	// [Claude] Lists
	NUM_LIST: 'numlist', // [Claude] lists (advlist adds list styles)
	BUL_LIST: 'bullist', // [Claude] lists (advlist adds list styles)

	// [Claude] Insert
	HR: 'hr',
	LINK: 'link', // [Claude] link
	IMAGE: 'image', // [Claude] image
	MEDIA: 'media', // [Claude] media
	TABLE: 'table', // [Claude] table
	EMOTICONS: 'emoticons', // [Claude] emoticons
	CHAR_MAP: 'charmap', // [Claude] charmap
	CODE_SAMPLE: 'codesample', // [Claude] codesample
	ACCORDION: 'accordion', // [Claude] accordion
	ACCORDION_REMOVE: 'accordionremove', // [Claude] accordion
	ANCHOR: 'anchor', // [Claude] anchor
	NONBREAKING: 'nonbreaking', // [Claude] nonbreaking
	INSERT_DATETIME: 'insertdatetime', // [Claude] insertdatetime

	// [Claude] Tools
	PRINT: 'print',
	SEARCH_REPLACE: 'searchreplace', // [Claude] searchreplace
	PREVIEW: 'preview', // [Claude] preview
	FULLSCREEN: 'fullscreen', // [Claude] fullscreen
	SOURCE_CODE: 'code', // [Claude] code; meant for the admin Email Templates only
} as const;

export type RichTextEditorToolbarItem =
	(typeof RichTextEditorToolbarItem)[keyof typeof RichTextEditorToolbarItem];
