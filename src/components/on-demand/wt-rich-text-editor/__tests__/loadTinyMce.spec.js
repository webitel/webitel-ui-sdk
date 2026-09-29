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
vi.mock('tinymce/plugins/emoticons', track('emoticons'));
vi.mock('tinymce/plugins/emoticons/js/emojis', track('emojis'));
vi.mock('tinymce/plugins/fullscreen', track('fullscreen'));
vi.mock('tinymce/plugins/image', track('image'));
vi.mock('tinymce/plugins/link', track('link'));
vi.mock('tinymce/plugins/lists', track('lists'));
vi.mock('tinymce/plugins/table', track('table'));
vi.mock('tinymce/skins/ui/oxide/skin.css', track('skin'));

const { loadTinyMce } = await import('../_internals/loadTinyMce');

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

	it('loads once, however many editors ask', async () => {
		const count = loaded.length;

		await Promise.all([
			loadTinyMce(),
			loadTinyMce(),
		]);

		expect(loaded).toHaveLength(count);
	});
});
