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
    <!-- tinymce-vue falls back to Tiny's cloud CDN when window.tinymce is
         missing, so the editor only mounts once the self-hosted copy is in -->
    <!-- [Claude] keyed by theme: TinyMCE cannot swap a running editor's skin, so a
         theme switch re-creates it (the content survives through v-model). The key
         sits on a wrapper: TinyMCE puts its UI next to its element, outside Vue's
         reach, and re-keying the editor itself breaks Vue's re-insert -->
    <div
      v-if="isTinyMceLoaded"
      :key="isDark ? 'dark' : 'light'"
      class="wt-rich-text-editor__editor"
    >
      <tiny-mce-editor
        :id="editorId"
        v-model="model"
        :disabled="disabled"
        :init="init"
        :output-format="output"
        :plugins="editorPlugins"
        :toolbar="editorToolbar"
        license-key="gpl"
      />
    </div>
    <wt-rich-text-editor-skeleton v-else />
  </div>
</template>

<script setup lang="ts">
/**
 * TinyMCE, self-hosted, loads with this component only: `components/index.js`
 * registers it through `defineAsyncComponent`, and TinyMCE itself is loaded
 * by `loadTinyMce` (in order) once the component is created.
 */
import TinyMceVueEditor from '@tinymce/tinymce-vue';
import { computed, onBeforeUnmount, ref, useId } from 'vue';

import { RichTextEditorPlugin } from '../../../enums/RichTextEditorPlugin/RichTextEditorPlugin.enum';
import { RichTextEditorToolbarItem } from '../../../enums/RichTextEditorToolbarItem/RichTextEditorToolbarItem.enum';
import WtLabel from '../../wt-label/wt-label.vue';
import { loadTinyMce } from './_internals/loadTinyMce';
import WtRichTextEditorSkeleton from './_internals/wt-rich-text-editor-skeleton.vue';

/**
 * tinymce-vue binds the model only when it finds `onUpdate:modelValue` in its
 * attrs. Apps on the @vue/compat runtime (cc-workspaces) rewrite `v-model` on
 * any component not marked as Vue 3 into the Vue 2 `value` / `input` pair, so
 * the listener never arrives and edits are lost (WTEL-4477). Marking the
 * editor as Vue 3 keeps `v-model` intact; plain Vue 3 ignores the option.
 */
// A copy rather than `extends`: `extends` does not carry `setup()`, which is
// all tinymce-vue's Editor is.
const TinyMceEditor = {
	...TinyMceVueEditor,
	name: 'TinyMceEditor',
	compatConfig: {
		MODE: 3,
	},
} as typeof TinyMceVueEditor;

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
	 * TinyMCE toolbar (button names: `RichTextEditorToolbarItem`), replacing the
	 * default for `output`: a TinyMCE toolbar string, or groups of buttons
	 * (`[['undo', 'redo'], ['bold']]` → `'undo redo | bold'`). The html default
	 * is minimal: undo/redo, bold, italic, underline, lists and link
	 */
	toolbar?: string | string[][];
	/**
	 * TinyMCE plugins, replacing the default for `output` (html: `lists`, `link`).
	 * Every plugin in the `RichTextEditorPlugin` enum is bundled; any other must
	 * be imported by the app.
	 */
	plugins?: string[];
}

// Vue 3 semantics on the @vue/compat runtime too (cc-workspaces): otherwise
// compat rewrites this component's own `v-model` to `value` / `input` and
// defineModel below never sees it.
defineOptions({
	compatConfig: {
		MODE: 3,
	},
});

const props = withDefaults(defineProps<Props>(), {
	output: 'html',
	height: 300,
});

/**
 * @model modelValue — the content, as `output` formats it
 */
const model = defineModel<string>();

const editorId = useId();

const isTinyMceLoaded = ref(false);
loadTinyMce().then(() => {
	isTinyMceLoaded.value = true;
});

// [Claude] A minimal, app-neutral setup; each usage passes its own `plugins` / `toolbar`
const HTML_PLUGINS = [
	RichTextEditorPlugin.LISTS,
	RichTextEditorPlugin.LINK,
];

const HTML_TOOLBAR = [
	[
		RichTextEditorToolbarItem.UNDO,
		RichTextEditorToolbarItem.REDO,
	],
	[
		RichTextEditorToolbarItem.BOLD,
		RichTextEditorToolbarItem.ITALIC,
		RichTextEditorToolbarItem.UNDERLINE,
	],
	[
		RichTextEditorToolbarItem.NUM_LIST,
		RichTextEditorToolbarItem.BUL_LIST,
	],
	[
		RichTextEditorToolbarItem.LINK,
	],
];

// [Claude] A flat string array would mean several toolbar rows to TinyMCE, so groups are joined here
function toToolbarString(toolbar: string | string[][]): string {
	if (typeof toolbar === 'string') return toolbar;
	return toolbar.map((group) => group.join(' ')).join(' | ');
}

const isHtml = computed(() => props.output === 'html');

const editorPlugins = computed(
	() => props.plugins ?? (isHtml.value ? HTML_PLUGINS : []),
);
const editorToolbar = computed(() =>
	toToolbarString(props.toolbar ?? (isHtml.value ? HTML_TOOLBAR : 'undo redo')),
);

const isDarkTheme = () =>
	document.documentElement.classList.contains('theme--dark');

const isDark = ref(isDarkTheme());

// The app switches themes by toggling `theme--dark` on <html>; follow it.
const themeObserver = new MutationObserver(() => {
	isDark.value = isDarkTheme();
});
themeObserver.observe(document.documentElement, {
	attributes: true,
	attributeFilter: [
		'class',
	],
});

onBeforeUnmount(() => {
	themeObserver.disconnect();
});

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
	// [Claude] read on every theme switch too: `isDark` re-creates the editor
	const dark = isDark.value;
	const { backgroundColor, color } = readColors();
	return {
		height: Number(props.height),
		menubar: false,
		statusbar: isHtml.value,
		toolbar_mode: 'sliding' as const,
		toolbar_sticky: true,
		placeholder: props.placeholder,
		// [Claude] TinyMCE's own skins and content styles, bundled by loadTinyMce
		skin: dark ? 'oxide-dark' : 'oxide',
		content_css: dark ? 'dark' : 'default',
		// [Claude] the app's colours; content_style comes after content_css, so it wins
		content_style: `body { background-color: ${backgroundColor}; color: ${color}; }`,
	};
});
</script>
