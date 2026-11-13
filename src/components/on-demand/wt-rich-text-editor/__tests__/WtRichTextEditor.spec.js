import { flushPromises, mount } from '@vue/test-utils';
import { nextTick } from 'vue';

// TinyMCE cannot run in jsdom: its side-effect imports are stubbed, and the
// Vue wrapper is replaced by a stub that records its props.
vi.mock('tinymce/tinymce', () => ({}));
vi.mock('tinymce/icons/default', () => ({}));
vi.mock('tinymce/models/dom', () => ({}));
vi.mock('tinymce/themes/silver', () => ({}));
vi.mock('tinymce/plugins/advlist', () => ({}));
vi.mock('tinymce/plugins/accordion', () => ({}));
vi.mock('tinymce/plugins/anchor', () => ({}));
vi.mock('tinymce/plugins/charmap', () => ({}));
vi.mock('tinymce/plugins/code', () => ({}));
vi.mock('tinymce/plugins/codesample', () => ({}));
vi.mock('tinymce/plugins/directionality', () => ({}));
vi.mock('tinymce/plugins/preview', () => ({}));
vi.mock('tinymce/plugins/insertdatetime', () => ({}));
vi.mock('tinymce/plugins/media', () => ({}));
vi.mock('tinymce/plugins/nonbreaking', () => ({}));
vi.mock('tinymce/plugins/searchreplace', () => ({}));
vi.mock('tinymce/plugins/emoticons', () => ({}));
vi.mock('tinymce/plugins/emoticons/js/emojis', () => ({}));
vi.mock('tinymce/plugins/fullscreen', () => ({}));
vi.mock('tinymce/plugins/image', () => ({}));
vi.mock('tinymce/plugins/link', () => ({}));
vi.mock('tinymce/plugins/lists', () => ({}));
vi.mock('tinymce/plugins/table', () => ({}));
vi.mock('tinymce/skins/ui/oxide/skin.js', () => ({}));
vi.mock('tinymce/skins/ui/oxide-dark/skin.js', () => ({}));
vi.mock('tinymce/skins/ui/oxide/content.js', () => ({}));
vi.mock('tinymce/skins/ui/oxide-dark/content.js', () => ({}));
vi.mock('tinymce/skins/content/default/content.js', () => ({}));
vi.mock('tinymce/skins/content/dark/content.js', () => ({}));
// setup-based like the real Editor, so wrapping it the wrong way shows up
vi.mock('@tinymce/tinymce-vue', async () => {
	const { h } = await import('vue');
	return {
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
			setup: () => () =>
				h('div', {
					class: 'editor-stub',
				}),
		},
	};
});

const { default: WtRichTextEditor } = await import(
	'../wt-rich-text-editor.vue'
);

// the editor mounts once TinyMCE has loaded (mocked here: at once)
const mountEditor = async (props = {}) => {
	const wrapper = mount(WtRichTextEditor, {
		props,
	});
	await flushPromises();
	return wrapper;
};

const editorStub = (wrapper) =>
	wrapper.findComponent({
		name: 'TinyMceEditor',
	});

describe('WtRichTextEditor', () => {
	afterEach(() => {
		document.documentElement.classList.remove('theme--dark');
	});

	it('shows a label only when given one', async () => {
		expect((await mountEditor()).find('.wt-label').exists()).toBe(false);
		const labelled = await mountEditor({
			label: 'Reply',
		});
		expect(labelled.text()).toContain('Reply');
	});

	// [Claude] The light skin in a dark app left white buttons and menus on a dark toolbar
	it("uses TinyMCE's own skin and content styles for the app's theme", async () => {
		const light = editorStub(await mountEditor()).props('init');
		document.documentElement.classList.add('theme--dark');
		const dark = editorStub(await mountEditor()).props('init');

		expect(light).toMatchObject({
			skin: 'oxide',
			content_css: 'default',
		});
		expect(dark).toMatchObject({
			skin: 'oxide-dark',
			content_css: 'dark',
		});
	});

	it('edits html with a minimal toolbar by default', async () => {
		const editor = editorStub(await mountEditor());

		expect(editor.props('outputFormat')).toBe('html');
		expect(editor.props('plugins')).toEqual([
			'lists',
			'link',
		]);
		expect(editor.props('toolbar')).toBe(
			'undo redo | bold italic underline | numlist bullist | link',
		);
		expect(editor.props('init').height).toBe(300);
		expect(editor.props('licenseKey')).toBe('gpl');
	});

	it('drops the formatting tools for plain text', async () => {
		const editor = editorStub(
			await mountEditor({
				output: 'text',
			}),
		);

		expect(editor.props('plugins')).toEqual([]);
		expect(editor.props('toolbar')).toBe('undo redo');
		expect(editor.props('init').statusbar).toBe(false);
	});

	it('takes toolbar and plugin overrides', async () => {
		const editor = editorStub(
			await mountEditor({
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

	it('joins toolbar groups into the TinyMCE toolbar string', async () => {
		const editor = editorStub(
			await mountEditor({
				toolbar: [
					[
						'undo',
						'redo',
					],
					[
						'bold',
						'italic',
					],
					[
						'link',
					],
				],
			}),
		);

		expect(editor.props('toolbar')).toBe('undo redo | bold italic | link');
	});

	it('passes the model through both ways', async () => {
		const wrapper = await mountEditor({
			modelValue: '<p>Hi</p>',
		});
		expect(editorStub(wrapper).props('modelValue')).toBe('<p>Hi</p>');

		await editorStub(wrapper).vm.$emit('update:modelValue', '<p>Hello</p>');

		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([
			'<p>Hello</p>',
		]);
	});

	it('re-creates the editor with the dark skin when the app switches theme', async () => {
		const wrapper = await mountEditor({
			modelValue: '<p>Kept</p>',
		});
		const before = editorStub(wrapper).vm;

		document.documentElement.classList.add('theme--dark');
		// MutationObserver callbacks run as microtasks
		await nextTick();
		await Promise.resolve();
		await nextTick();

		const after = editorStub(wrapper);
		expect(after.vm).not.toBe(before);
		expect(after.props('init').skin).toBe('oxide-dark');
		expect(after.props('modelValue')).toBe('<p>Kept</p>');
	});
});
