import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { saveBlobAsFile } from '../saveBlobAsFile';

const OBJECT_URL = 'blob:https://example.test/0d1f';

describe('saveBlobAsFile', () => {
	let clicks: Array<{
		download: string;
		href: string;
		rel: string;
	}>;

	beforeEach(() => {
		vi.useFakeTimers();

		vi.spyOn(URL, 'createObjectURL').mockReturnValue(OBJECT_URL);
		vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

		clicks = [];
		vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
			this: HTMLAnchorElement,
		) {
			clicks.push({
				download: this.download,
				href: this.href,
				rel: this.rel,
			});
		});
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it('clicks a download anchor pointing at the blob, then removes it', () => {
		saveBlobAsFile(
			new Blob([
				'x',
			]),
			'payload.html',
		);

		expect(clicks).toEqual([
			{
				download: 'payload.html',
				href: OBJECT_URL,
				rel: 'noopener noreferrer',
			},
		]);
		expect(document.querySelector('a')).toBeNull();
	});

	it('releases the object url only once the download had time to start', () => {
		saveBlobAsFile(
			new Blob([
				'x',
			]),
			'payload.html',
		);

		expect(URL.revokeObjectURL).not.toHaveBeenCalled();

		vi.runAllTimers();

		expect(URL.revokeObjectURL).toHaveBeenCalledWith(OBJECT_URL);
	});
});
