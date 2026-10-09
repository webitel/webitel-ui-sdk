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
    <tiny-mce-editor
      v-if="isTinyMceLoaded"
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
import type { Editor as TinyMceInstance } from 'tinymce';
import { computed, onBeforeUnmount, ref, useId } from 'vue';

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
.wt-rich-text-editor :deep(.tox:not(.tox-tinymce-inline) .tox-editor-header) {
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
