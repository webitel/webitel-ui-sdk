import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { openStorageFileInNewTab } from '../openStorageFileInNewTab';

const OBJECT_URL = 'blob:https://example.test/0d1f';

interface FakeTab {
	location: { href: string };
	opener: unknown;
	close: ReturnType<typeof vi.fn>;
}

const createTab = (): FakeTab => ({
	location: {
		href: '',
	},
	// a freshly opened about:blank tab really does hold a back-reference
	opener: {},
	close: vi.fn(),
});

const respondWith = (type: string, ok = true) => {
	const blob = new Blob(
		[
			'x',
		],
		{
			type,
		},
	);

	vi.stubGlobal(
		'fetch',
		vi.fn().mockResolvedValue({
			ok,
			statusText: ok ? 'OK' : 'Not Found',
			blob: () => Promise.resolve(blob),
		}),
	);
};

describe('openStorageFileInNewTab', () => {
	let tab: FakeTab;
	let open: ReturnType<typeof vi.fn>;
	let clicks: Array<{ download: string }>;

	beforeEach(() => {
		vi.useFakeTimers();

		tab = createTab();
		// `vi.spyOn` on an already stubbed global hands back the same mock, so
		// spying and stubbing the same name would make it call itself
		open = vi.spyOn(window, 'open').mockReturnValue(
			tab as unknown as Window,
		) as unknown as ReturnType<typeof vi.fn>;

		vi.spyOn(URL, 'createObjectURL').mockReturnValue(OBJECT_URL);
		vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

		clicks = [];
		vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
			function (this: HTMLAnchorElement) {
				clicks.push({
					download: this.download,
				});
			},
		);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it.each([
		'application/pdf',
		'image/png',
		'video/mp4',
		'text/plain; charset=utf-8',
	])('renders %s inline and drops the opener', async (type) => {
		respondWith(type);

		await openStorageFileInNewTab({
			url: '/api/storage/file/1/download',
		});

		expect(tab.location.href).toBe(OBJECT_URL);
		expect(tab.opener).toBeNull();
		expect(tab.close).not.toHaveBeenCalled();
		expect(clicks).toHaveLength(0);
	});

	it.each([
		'text/html',
		'image/svg+xml',
		'application/octet-stream',
	])('saves %s to disk instead of rendering it', async (type) => {
		respondWith(type);

		await openStorageFileInNewTab({
			url: '/api/storage/file/1/download',
			name: 'payload.html',
		});

		expect(tab.location.href).toBe('');
		expect(tab.close).toHaveBeenCalled();
		expect(clicks).toEqual([
			{
				download: 'payload.html',
			},
		]);
	});

	it.each([
		'javascript:alert(1)',
		'data:text/html,<script>alert(1)</script>',
	])('never opens a tab for %s', async (url) => {
		respondWith('application/pdf');

		await openStorageFileInNewTab({
			url,
		});

		expect(open).not.toHaveBeenCalled();
		expect(fetch).not.toHaveBeenCalled();
	});

	it('releases the object url once the tab had time to load', async () => {
		respondWith('application/pdf');

		await openStorageFileInNewTab({
			url: '/api/storage/file/1/download',
		});

		expect(URL.revokeObjectURL).not.toHaveBeenCalled();

		vi.runAllTimers();

		expect(URL.revokeObjectURL).toHaveBeenCalledWith(OBJECT_URL);
	});

	it('closes the tab when the fetch fails', async () => {
		respondWith('application/pdf', false);
		vi.spyOn(console, 'error').mockImplementation(() => {});

		await openStorageFileInNewTab({
			url: '/api/storage/file/1/download',
		});

		expect(tab.close).toHaveBeenCalled();
		expect(tab.location.href).toBe('');
	});

	it('does nothing without an id or a url', async () => {
		respondWith('application/pdf');

		await openStorageFileInNewTab();
		await openStorageFileInNewTab({});

		expect(open).not.toHaveBeenCalled();
	});
});
