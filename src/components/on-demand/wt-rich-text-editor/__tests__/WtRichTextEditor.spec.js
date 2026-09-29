import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

// TinyMCE cannot run in jsdom: its side-effect imports are stubbed, and the
// Vue wrapper is replaced by a stub that records its props.
vi.mock('tinymce/tinymce', () => ({}));
vi.mock('tinymce/icons/default', () => ({}));
vi.mock('tinymce/models/dom', () => ({}));
vi.mock('tinymce/themes/silver', () => ({}));
vi.mock('tinymce/plugins/advlist', () => ({}));
vi.mock('tinymce/plugins/emoticons', () => ({}));
vi.mock('tinymce/plugins/emoticons/js/emojis', () => ({}));
vi.mock('tinymce/plugins/fullscreen', () => ({}));
vi.mock('tinymce/plugins/image', () => ({}));
vi.mock('tinymce/plugins/link', () => ({}));
vi.mock('tinymce/plugins/lists', () => ({}));
vi.mock('tinymce/plugins/table', () => ({}));
vi.mock('tinymce/skins/ui/oxide/skin.css', () => ({}));
vi.mock('@tinymce/tinymce-vue', () => ({
	default: {
		name: 'Editor',
		props: [
			'id',
			'modelValue',
			'init',
			'plugins',
			'toolbar',
			'outputFormat',
			'disabled',
			'licenseKey',
		],
		emits: [
			'update:modelValue',
			'init',
		],
		template: '<div class="editor-stub" />',
	},
}));

const { default: WtRichTextEditor } = await import(
	'../wt-rich-text-editor.vue'
);

const mountEditor = (props = {}) =>
	mount(WtRichTextEditor, {
		props,
	});

const editorStub = (wrapper) =>
	wrapper.findComponent({
		name: 'Editor',
	});

describe('WtRichTextEditor', () => {
	afterEach(() => {
		document.documentElement.classList.remove('theme--dark');
	});

	it('shows a label only when given one', () => {
		expect(mountEditor().find('.wt-label').exists()).toBe(false);
		expect(
			mountEditor({
				label: 'Reply',
			}).text(),
		).toContain('Reply');
	});

	it('edits html with the full toolbar by default', () => {
		const editor = editorStub(mountEditor());

		expect(editor.props('outputFormat')).toBe('html');
		expect(editor.props('plugins')).toContain('table');
		expect(editor.props('toolbar')).toContain('bold italic');
		expect(editor.props('init').height).toBe(300);
		expect(editor.props('licenseKey')).toBe('gpl');
	});

	it('drops the formatting tools for plain text', () => {
		const editor = editorStub(
			mountEditor({
				output: 'text',
			}),
		);

		expect(editor.props('plugins')).toEqual([]);
		expect(editor.props('toolbar')).toBe('undo redo');
		expect(editor.props('init').statusbar).toBe(false);
	});

	it('takes toolbar and plugin overrides', () => {
		const editor = editorStub(
			mountEditor({
				toolbar: 'bold italic | link',
				plugins: [
					'link',
				],
			}),
		);

		expect(editor.props('toolbar')).toBe('bold italic | link');
		expect(editor.props('plugins')).toEqual([
			'link',
		]);
	});

	it('passes the model through both ways', async () => {
		const wrapper = mountEditor({
			modelValue: '<p>Hi</p>',
		});
		expect(editorStub(wrapper).props('modelValue')).toBe('<p>Hi</p>');

		await editorStub(wrapper).vm.$emit('update:modelValue', '<p>Hello</p>');

		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
			'<p>Hello</p>',
		]);
	});

	it('restyles the editable body when the app switches theme', async () => {
		const body = {};
		const setStyles = vi.fn();
		const wrapper = mountEditor();

		editorStub(wrapper).vm.$emit(
			'init',
			{},
			{
				getBody: () => body,
				dom: {
					setStyles,
				},
			},
		);
		document.documentElement.classList.add('theme--dark');
		// MutationObserver callbacks run as microtasks
		await nextTick();
		await Promise.resolve();

		expect(setStyles).toHaveBeenCalledWith(
			body,
			expect.objectContaining({
				backgroundColor: expect.any(String),
				color: expect.any(String),
			}),
		);
	});
});
