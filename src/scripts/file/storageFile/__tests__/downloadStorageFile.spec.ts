import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { downloadStorageFile } from '../downloadStorageFile';

describe('downloadStorageFile', () => {
	let clicks: Array<{ href: string; download: string; rel: string }>;

	beforeEach(() => {
		clicks = [];
		vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
			function (this: HTMLAnchorElement) {
				clicks.push({
					href: this.getAttribute('href') ?? '',
					download: this.download,
					rel: this.rel,
				});
			},
		);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('downloads a safe url', () => {
		downloadStorageFile({
			url: 'https://example.test/file.pdf',
			name: 'file.pdf',
		});

		expect(clicks).toHaveLength(1);
		expect(clicks[0].href).toBe('https://example.test/file.pdf');
		expect(clicks[0].download).toBe('file.pdf');
		expect(clicks[0].rel).toBe('noopener noreferrer');
	});

	it.each([
		'javascript:alert(1)',
		'data:text/html,<script>alert(1)</script>',
	])('does not click anything for %s', (url) => {
		downloadStorageFile({
			url,
			name: 'file.pdf',
		});

		expect(clicks).toHaveLength(0);
	});
});
