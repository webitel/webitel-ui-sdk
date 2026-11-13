const { loaded, track } = vi.hoisted(() => {
	const loaded = [];
	return {
		loaded,
		track: (name) => () => {
			loaded.push(name);
			return {};
		},
	};
});

vi.mock('tinymce/tinymce', track('core'));
vi.mock('tinymce/icons/default', track('icons'));
vi.mock('tinymce/models/dom', track('model'));
vi.mock('tinymce/themes/silver', track('theme'));
vi.mock('tinymce/plugins/advlist', track('advlist'));
vi.mock('tinymce/plugins/accordion', track('accordion'));
vi.mock('tinymce/plugins/anchor', track('anchor'));
vi.mock('tinymce/plugins/charmap', track('charmap'));
vi.mock('tinymce/plugins/code', track('code'));
vi.mock('tinymce/plugins/codesample', track('codesample'));
vi.mock('tinymce/plugins/directionality', track('directionality'));
vi.mock('tinymce/plugins/preview', track('preview'));
vi.mock('tinymce/plugins/insertdatetime', track('insertdatetime'));
vi.mock('tinymce/plugins/media', track('media'));
vi.mock('tinymce/plugins/nonbreaking', track('nonbreaking'));
vi.mock('tinymce/plugins/searchreplace', track('searchreplace'));
vi.mock('tinymce/plugins/emoticons', track('emoticons'));
vi.mock('tinymce/plugins/emoticons/js/emojis', track('emojis'));
vi.mock('tinymce/plugins/fullscreen', track('fullscreen'));
vi.mock('tinymce/plugins/image', track('image'));
vi.mock('tinymce/plugins/link', track('link'));
vi.mock('tinymce/plugins/lists', track('lists'));
vi.mock('tinymce/plugins/table', track('table'));
vi.mock('tinymce/skins/ui/oxide/skin.js', track('skin'));
vi.mock('tinymce/skins/ui/oxide-dark/skin.js', track('skin-dark'));
vi.mock('tinymce/skins/ui/oxide/content.js', track('content-ui'));
vi.mock('tinymce/skins/ui/oxide-dark/content.js', track('content-ui-dark'));
vi.mock('tinymce/skins/content/default/content.js', track('content-default'));
vi.mock('tinymce/skins/content/dark/content.js', track('content-dark'));

const { loadTinyMce } = await import('../_internals/loadTinyMce');
const { RichTextEditorPlugin } = await import(
	'../../../../enums/RichTextEditorPlugin/RichTextEditorPlugin.enum'
);

describe('loadTinyMce', () => {
	it('evaluates the core before any add-on that registers on it', async () => {
		await loadTinyMce();

		expect(loaded[0]).toBe('core');
		expect(loaded).toEqual(
			expect.arrayContaining([
				'icons',
				'model',
				'theme',
				'table',
				'skin',
			]),
		);
	});

	// [Claude] The enum promises these plugins work without an app import
	it('loads every plugin in RichTextEditorPlugin', async () => {
		await loadTinyMce();

		expect(loaded).toEqual(
			expect.arrayContaining(Object.values(RichTextEditorPlugin)),
		);
	});

	it("loads TinyMCE's skins and content styles, light and dark", async () => {
		await loadTinyMce();

		expect(loaded).toEqual(
			expect.arrayContaining([
				'skin',
				'skin-dark',
				'content-ui',
				'content-ui-dark',
				'content-default',
				'content-dark',
			]),
		);
	});

	it('loads once, however many editors ask', async () => {
		const count = loaded.length;

		await Promise.all([
			loadTinyMce(),
			loadTinyMce(),
		]);

		expect(loaded).toHaveLength(count);
	});
});
