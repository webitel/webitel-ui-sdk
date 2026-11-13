/**
 * cc-workspaces runs on the @vue/compat runtime. There, a component given a
 * `modelValue` prop has it rewritten to `value` / `onModelCompat:input` unless
 * the component is marked as Vue 3 — and tinymce-vue binds the model only when
 * `onUpdate:modelValue` is in its attrs, so it silently stops emitting
 * (WTEL-4477). This runs the editor on the compat runtime (one instance of it:
 * @vue/test-utils would bring the real `vue`, so mounting goes through compat's
 * own createApp) to pin that the listener still arrives.
 */
vi.mock('vue', async () => await import('@vue/compat'));

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

// Stands in for tinymce-vue's Editor: no declared emits, model read from attrs.
const seenAttrs = [];
const seenModel = [];
let emitEdit = () => {};
vi.mock('@tinymce/tinymce-vue', async () => {
	const { defineComponent, h } = await import('@vue/compat');
	return {
		default: defineComponent({
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
			setup(props, ctx) {
				seenAttrs.push(Object.keys(ctx.attrs));
				seenModel.push(props.modelValue);
				// lets a test type into the stand-in
				emitEdit = (value) => ctx.attrs['onUpdate:modelValue']?.(value);
				return () => h('div');
			},
		}),
	};
});

const { configureCompat, createApp, h } = await import('@vue/compat');
const { default: TinyMceVueEditor } = await import('@tinymce/tinymce-vue');
const { default: WtRichTextEditor } = await import(
	'../wt-rich-text-editor.vue'
);

async function render(component, props) {
	const app = createApp({
		render: () => h(component, props),
	});
	// the label is resolved globally in apps; not under test here
	app.component('WtLabel', {
		render: () => null,
	});
	app.mount(document.createElement('div'));
	// the editor mounts once TinyMCE has loaded (mocked here: at once)
	await new Promise((resolve) => setTimeout(resolve));
	return app;
}

describe('WtRichTextEditor on @vue/compat', () => {
	beforeAll(() => {
		configureCompat({
			MODE: 2,
		});
	});

	afterAll(() => {
		configureCompat({
			MODE: 3,
		});
	});

	beforeEach(() => {
		seenAttrs.length = 0;
		seenModel.length = 0;
	});

	it('control: compat takes the model listener away from plain tinymce-vue', async () => {
		(
			await render(TinyMceVueEditor, {
				modelValue: '',
				'onUpdate:modelValue': () => {},
			})
		).unmount();

		expect(seenAttrs[0]).not.toContain('onUpdate:modelValue');
	});

	it('keeps the model listener on its editor', async () => {
		(
			await render(WtRichTextEditor, {
				modelValue: '',
				'onUpdate:modelValue': () => {},
			})
		).unmount();

		expect(seenAttrs[0]).toContain('onUpdate:modelValue');
	});

	it('takes its own v-model on compat: the value in, edits out', async () => {
		const onUpdate = vi.fn();
		await render(WtRichTextEditor, {
			modelValue: '<p>Seed</p>',
			'onUpdate:modelValue': onUpdate,
		});

		expect(seenModel[0]).toBe('<p>Seed</p>');
		emitEdit('<p>Edited</p>');
		expect(onUpdate).toHaveBeenCalledWith('<p>Edited</p>');
	});
});
