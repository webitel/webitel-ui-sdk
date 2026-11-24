import { afterEach, describe, expect, it } from 'vitest';
import {
	appSlug,
	ENABLED_TTL_MS,
	enabledUntil,
	resolveEnabled,
	STORAGE,
	stripUrlFlag,
} from '../config';

const NOW = 1_800_000_000_000;

function openWith(search: string) {
	window.history.replaceState(null, '', `/workspace/${search}`);
}

describe('resolveEnabled', () => {
	afterEach(() => {
		localStorage.clear();
		openWith('');
	});

	it('is off by default', () => {
		expect(resolveEnabled(NOW)).toBe(false);
	});

	it('turns on from ?debug=1 and stays on after the param is gone, until the TTL', () => {
		openWith('?debug=1');
		expect(resolveEnabled(NOW)).toBe(true);

		openWith('');
		expect(resolveEnabled(NOW + ENABLED_TTL_MS - 1)).toBe(true);
		expect(resolveEnabled(NOW + ENABLED_TTL_MS)).toBe(false);
		expect(localStorage.getItem(STORAGE.enabled)).toBeNull();
	});

	it('turns off from ?debug=0', () => {
		openWith('?debug=1');
		resolveEnabled(NOW);
		openWith('?debug=0');
		expect(resolveEnabled(NOW)).toBe(false);
	});

	it('ignores the pre-TTL "1" value', () => {
		localStorage.setItem(STORAGE.enabled, '1');
		expect(resolveEnabled(NOW)).toBe(false);
	});
});

describe('stripUrlFlag', () => {
	afterEach(() => {
		openWith('');
	});

	it('removes debug from the query and the hash query, keeps the rest', () => {
		window.history.replaceState(
			null,
			'',
			'/workspace/?debug=1&lang=uk#/queue?debug=1&tab=2',
		);
		stripUrlFlag();
		expect(
			window.location.pathname + window.location.search + window.location.hash,
		).toBe('/workspace/?lang=uk#/queue?tab=2');
	});

	it('leaves a URL without the flag alone', () => {
		openWith('?x=1');
		stripUrlFlag();
		expect(window.location.search).toBe('?x=1');
	});
});

describe('shared store', () => {
	afterEach(() => {
		localStorage.clear();
		window.history.replaceState(null, '', '/');
	});

	it('turns recording on for every app of the origin from any one of them', () => {
		window.history.replaceState(null, '', '/workspace/?debug=1');
		expect(resolveEnabled(NOW)).toBe(true);
		window.history.replaceState(null, '', '/admin/');
		expect(resolveEnabled(NOW)).toBe(true);
		expect(enabledUntil(NOW)).toBe(NOW + ENABLED_TTL_MS);
	});

	it('does not reuse the names of the earlier per-app and spike stores', () => {
		for (const name of Object.values(STORAGE)) {
			expect(name.startsWith('wt-debug-recorder')).toBe(false);
		}
	});

	it('turns an app name into a short id', () => {
		expect(appSlug('Admin Panel')).toBe('admin-panel');
		expect(appSlug('  ')).toBe('app');
	});
});
