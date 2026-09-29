<template>
  <div class="wt-rich-text-editor">
    <wt-label
      v-if="label || $slots.label"
      :disabled="disabled"
      :for="editorId"
      v-bind="labelProps"
    >
      <!-- @slot Custom editor label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ label }}
      </slot>
    </wt-label>
    <tiny-mce-editor
      :id="editorId"
      v-model="model"
      :disabled="disabled"
      :init="init"
      :output-format="output"
      :plugins="editorPlugins"
      :toolbar="editorToolbar"
      license-key="gpl"
      @init="handleInit"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * TinyMCE, self-hosted. Everything below loads with this component only:
 * `components/index.js` registers it through `defineAsyncComponent`, so an
 * app that never renders an editor never downloads TinyMCE.
 */
import TinyMceEditor from '@tinymce/tinymce-vue';
import type { Editor as TinyMceInstance } from 'tinymce';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/models/dom';
import 'tinymce/themes/silver';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/skins/ui/oxide/skin.css';
import { computed, onBeforeUnmount, useId } from 'vue';

import WtLabel from '../../wt-label/wt-label.vue';

type RichTextOutput = 'html' | 'text';

interface Props {
	/**
	 * Editor label
	 */
	label?: string;
	/**
	 * Object with props, passed down to wt-label as props
	 */
	labelProps?: Record<string, unknown>;
	/**
	 * `html` keeps the formatting toolbar; `text` edits (and emits) plain text
	 * @values html, text
	 */
	output?: RichTextOutput;
	/**
	 * Editor height, in px
	 */
	height?: number | string;
	disabled?: boolean;
	/**
	 * Placeholder shown while the editor is empty
	 */
	placeholder?: string;
	/**
	 * TinyMCE toolbar, replacing the default for `output`
	 */
	toolbar?: string;
	/**
	 * TinyMCE plugins, replacing the default for `output`. A plugin outside
	 * the bundled set (advlist, emoticons, fullscreen, image, link, lists,
	 * table) must be imported by the app.
	 */
	plugins?: string[];
}

const props = withDefaults(defineProps<Props>(), {
	output: 'html',
	height: 300,
});

/**
 * @model modelValue — the content, as `output` formats it
 */
const model = defineModel<string>();

const editorId = useId();

const HTML_PLUGINS = [
	'advlist',
	'emoticons',
	'fullscreen',
	'image',
	'link',
	'lists',
	'table',
];

const HTML_TOOLBAR = [
	'undo redo',
	'bold italic underline strikethrough',
	'fullscreen',
	'fontfamily fontsize',
	'alignleft aligncenter alignright alignjustify',
	'numlist bullist',
	'forecolor backcolor removeformat',
	'emoticons image link table',
].join(' | ');

const isHtml = computed(() => props.output === 'html');

const editorPlugins = computed(
	() => props.plugins ?? (isHtml.value ? HTML_PLUGINS : []),
);
const editorToolbar = computed(
	() => props.toolbar ?? (isHtml.value ? HTML_TOOLBAR : 'undo redo'),
);

// The editable area lives in an iframe, out of reach of the app's CSS
// variables, so its colours are read from the page and handed over.
function readColors() {
	const styles = getComputedStyle(document.documentElement);
	return {
		backgroundColor: styles.getPropertyValue('--content-wrapper-color').trim(),
		color: styles.getPropertyValue('--wt-text-field-text-color').trim(),
	};
}

const init = computed(() => {
	const { backgroundColor, color } = readColors();
	return {
		height: Number(props.height),
		menubar: false,
		statusbar: isHtml.value,
		toolbar_mode: 'sliding' as const,
		toolbar_sticky: true,
		placeholder: props.placeholder,
		// the skin CSS is imported above; content styles are set here
		skin: false,
		content_css: false,
		content_style: `body { background-color: ${backgroundColor}; color: ${color}; }`,
	};
});

let editor: TinyMceInstance | null = null;

// The app switches themes by toggling `theme--dark` on <html>; follow it.
const themeObserver = new MutationObserver(() => {
	if (!editor?.getBody()) return;
	editor.dom.setStyles(editor.getBody(), readColors());
});

function handleInit(_event: unknown, initialized: TinyMceInstance) {
	editor = initialized;
	themeObserver.observe(document.documentElement, {
		attributes: true,
		attributeFilter: [
			'class',
		],
	});
}

onBeforeUnmount(() => {
	themeObserver.disconnect();
	editor = null;
});
</script>

<style scoped>
.wt-rich-text-editor :deep(.tox-toolbar__primary),
.wt-rich-text-editor :deep(.tox-editor-header) {
  background-color: var(--content-wrapper-color);
}

.wt-rich-text-editor :deep(.tox-tbtn svg) {
  fill: var(--icon-active-color);
}

.wt-rich-text-editor :deep(.tox-tbtn--disabled svg),
.wt-rich-text-editor :deep(.tox-tbtn--disabled:hover svg) {
  fill: var(--icon-color);
}
</style>
