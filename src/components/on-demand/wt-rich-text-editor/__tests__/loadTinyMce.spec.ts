const { loaded, track, addI18n } = vi.hoisted(() => {
	const loaded: string[] = [];
	return {
		loaded,
		track: (name: string) => () => {
			loaded.push(name);
			return {};
		},
		addI18n: vi.fn(),
	};
});

// [Claude] the core sets the global `tinymce`, as the real one does
vi.mock('tinymce/tinymce', () => {
	loaded.push('core');
	Object.assign(window, {
		tinymce: {
			addI18n,
		},
	});
	return {};
});
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
vi.mock('../_internals/plugins/variables', track('wtvariables'));
vi.mock('tinymce/skins/ui/oxide/skin.js', track('skin'));
vi.mock('tinymce/skins/ui/oxide-dark/skin.js', track('skin-dark'));
vi.mock('tinymce/skins/ui/oxide/content.js', track('content-ui'));
vi.mock('tinymce/skins/ui/oxide-dark/content.js', track('content-ui-dark'));
vi.mock('tinymce/skins/content/default/content.js', track('content-default'));
vi.mock('tinymce/skins/content/dark/content.js', track('content-dark'));
vi.mock('../_internals/langs/uk', () => {
	loaded.push('lang-uk');
	return {
		default: {
			Bold: 'Жирний',
			Accordion: '',
		},
	};
});
vi.mock('../_internals/langs/kk', () => {
	loaded.push('lang-kk');
	return {
		default: {},
	};
});

const { loadTinyMce, loadTinyMceLanguage, toTinyMceLanguage } = await import(
	'../_internals/loadTinyMce'
);
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

	it("maps the apps' locales to TinyMCE languages, English and unknown to none", () => {
		expect(toTinyMceLanguage('uk')).toBe('uk');
		expect(toTinyMceLanguage('kz')).toBe('kk');
		expect(toTinyMceLanguage('uk-UA')).toBe('uk');
		expect(toTinyMceLanguage('en')).toBeNull();
		expect(toTinyMceLanguage('fr')).toBeNull();
		expect(toTinyMceLanguage(undefined)).toBeNull();
	});

	it('loads a language pack after the core, each one once', async () => {
		await Promise.all([
			loadTinyMceLanguage('uk'),
			loadTinyMceLanguage('uk'),
		]);
		await loadTinyMceLanguage('kk');

		expect(loaded.filter((name) => name === 'lang-uk')).toHaveLength(1);
		expect(loaded.indexOf('lang-uk')).toBeGreaterThan(loaded.indexOf('core'));
		expect(loaded).toContain('lang-kk');
	});

	// [Claude] TinyMCE shows an empty translation as an empty label, not as English
	it('registers a pack with TinyMCE, leaving out untranslated (empty) strings', async () => {
		await loadTinyMceLanguage('uk');

		expect(addI18n).toHaveBeenCalledWith('uk', {
			Bold: 'Жирний',
		});
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
