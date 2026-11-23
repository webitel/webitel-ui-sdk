import { afterEach, describe, expect, it, vi } from 'vitest';
import { currentLang, currentLocaleTag, t } from '../texts';

const LANGS = [
	'en',
	'uk',
	'ru',
	'es',
	'kz',
	'pl',
	'ro',
	'uz',
	'vi',
];

describe('REC chip texts', () => {
	afterEach(() => {
		localStorage.clear();
		vi.unstubAllGlobals();
	});

	it('has every text in every webitel language, with the same placeholders', () => {
		const keys = [
			'chipTitle',
			'title',
			'recordingOn',
			'summary',
			'download',
			'stop',
			'confirm',
			'confirmDelete',
			'cancel',
			'preparing',
			'deleting',
			'failed',
			'stopped',
			'signInToDownload',
		] as const;
		for (const lang of LANGS) {
			localStorage.setItem('lang', lang);
			for (const key of keys) {
				const text = t(key, {
					count: 7,
					since: 'X',
				});
				expect(text, `${lang}.${key}`).not.toBe('');
				expect(text, `${lang}.${key}`).not.toMatch(/\{\w+\}/);
			}
			const summary = t('summary', {
				count: 7,
				since: 'X',
			});
			expect(summary).toContain('7');
			expect(summary).toContain('X');
		}
	});

	it('follows the language the app keeps in localStorage', () => {
		localStorage.setItem('lang', 'uk');
		expect(t('download')).toBe('Завантажити архів');
		localStorage.setItem('lang', 'pl');
		expect(t('download')).toBe('Pobierz archiwum');
	});

	it('maps the browser code for Kazakh, falls back to English', () => {
		vi.stubGlobal('navigator', {
			languages: [
				'kk-KZ',
			],
		});
		expect(currentLang()).toBe('kz');
		expect(currentLocaleTag()).toBe('kk');

		vi.stubGlobal('navigator', {
			languages: [
				'de-DE',
			],
		});
		expect(currentLang()).toBe('en');
	});
});
