import { afterEach, describe, expect, it } from 'vitest';
import {
	ENABLED_TTL_MS,
	recorderNames,
	resolveEnabled,
	stripUrlFlag,
} from '../config';

const NOW = 1_800_000_000_000;
const names = recorderNames('workspace');

function openWith(search: string) {
	window.history.replaceState(null, '', `/workspace/${search}`);
}

describe('resolveEnabled', () => {
	afterEach(() => {
		localStorage.clear();
		openWith('');
	});

	it('is off by default', () => {
		expect(resolveEnabled(names, NOW)).toBe(false);
	});

	it('turns on from ?debug=1 and stays on after the param is gone, until the TTL', () => {
		openWith('?debug=1');
		expect(resolveEnabled(names, NOW)).toBe(true);

		openWith('');
		expect(resolveEnabled(names, NOW + ENABLED_TTL_MS - 1)).toBe(true);
		expect(resolveEnabled(names, NOW + ENABLED_TTL_MS)).toBe(false);
		expect(localStorage.getItem(names.enabled)).toBeNull();
	});

	it('turns off from ?debug=0', () => {
		openWith('?debug=1');
		resolveEnabled(names, NOW);
		openWith('?debug=0');
		expect(resolveEnabled(names, NOW)).toBe(false);
	});

	it('ignores the pre-TTL "1" value', () => {
		localStorage.setItem(names.enabled, '1');
		expect(resolveEnabled(names, NOW)).toBe(false);
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

describe('recorderNames', () => {
	it('keeps every app in its own storage', () => {
		const workspace = recorderNames('workspace');
		const admin = recorderNames('Admin Panel');
		expect(workspace.db).toBe('wt-debug-recorder:workspace');
		expect(admin.db).toBe('wt-debug-recorder:admin-panel');
		expect(workspace.enabled).not.toBe(admin.enabled);
	});

	it('does not let ?debug=1 in one app switch on another', () => {
		window.history.replaceState(null, '', '/workspace/?debug=1');
		expect(resolveEnabled(recorderNames('workspace'), NOW)).toBe(true);
		window.history.replaceState(null, '', '/admin/');
		expect(resolveEnabled(recorderNames('admin'), NOW)).toBe(false);
		localStorage.clear();
	});
});
