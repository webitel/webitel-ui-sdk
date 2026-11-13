<template>
  <wt-rich-text-editor
    v-model="value"
    :height="500"
    :plugins="plugins"
    :toolbar="toolbar"
    label="Knowledge base article"
  />
  <p>{{ value }}</p>
</template>

<script setup>
import {
	RichTextEditorToolbarItem as Item,
	RichTextEditorPlugin,
} from '@webitel/ui-sdk/enums';
import { ref } from 'vue';

const value = ref(
	'<h2>Getting started</h2><p>Every bundled plugin and core button is enabled here.</p>',
);

const plugins = Object.values(RichTextEditorPlugin);

// [Claude] Each inner array is a group; wt-rich-text-editor joins them with `|`. Buttons that do not fit go to the "more" drawer
const toolbar = [
	[
		Item.UNDO,
		Item.REDO,
	],
	[
		Item.CUT,
		Item.COPY,
		Item.PASTE,
		Item.PASTE_TEXT,
		Item.SELECT_ALL,
	],
	[
		Item.BLOCKS,
		Item.STYLES,
	],
	[
		Item.FONT_FAMILY,
		Item.FONT_SIZE,
		Item.LINE_HEIGHT,
	],
	[
		Item.BOLD,
		Item.ITALIC,
		Item.UNDERLINE,
		Item.STRIKETHROUGH,
		Item.SUBSCRIPT,
		Item.SUPERSCRIPT,
	],
	[
		Item.FORE_COLOR,
		Item.BACK_COLOR,
		Item.REMOVE_FORMAT,
	],
	[
		Item.ALIGN_LEFT,
		Item.ALIGN_CENTER,
		Item.ALIGN_RIGHT,
		Item.ALIGN_JUSTIFY,
		Item.OUTDENT,
		Item.INDENT,
		Item.LTR,
		Item.RTL,
	],
	[
		Item.NUM_LIST,
		Item.BUL_LIST,
	],
	[
		Item.HR,
		Item.LINK,
		Item.IMAGE,
		Item.MEDIA,
		Item.TABLE,
		Item.EMOTICONS,
		Item.CHAR_MAP,
		Item.CODE_SAMPLE,
		Item.ACCORDION,
		Item.ACCORDION_REMOVE,
		Item.ANCHOR,
		Item.NONBREAKING,
		Item.INSERT_DATETIME,
	],
	[
		Item.PRINT,
		Item.SEARCH_REPLACE,
		Item.PREVIEW,
		Item.FULLSCREEN,
		Item.SOURCE_CODE,
	],
];
</script>
