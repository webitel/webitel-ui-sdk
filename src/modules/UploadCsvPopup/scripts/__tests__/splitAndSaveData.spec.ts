import { describe, expect, it, vi } from 'vitest';

import splitAndSaveData from '../splitAndSaveData';

const rows = (count: number) =>
	Array.from(
		{
			length: count,
		},
		(_, i) => i,
	);

describe('splitAndSaveData', () => {
	it('saves in chunks of 100 and reports progress after each chunk', async () => {
		const saveCallback = vi.fn();
		const onProgress = vi.fn();

		await splitAndSaveData({
			data: rows(130),
			saveCallback,
			onProgress,
		});

		expect(saveCallback).toHaveBeenCalledTimes(2);
		expect(saveCallback.mock.calls[1][0]).toHaveLength(30);
		expect(onProgress.mock.calls.map(([saved]) => saved)).toEqual([
			100,
			130,
		]);
	});

	it('reports rows saved inside a chunk with offset of previous chunks', async () => {
		const onProgress = vi.fn();

		await splitAndSaveData({
			data: rows(102),
			saveCallback: async (chunk, { onItemsSaved }) => {
				chunk.forEach((_, index) => onItemsSaved(index + 1));
			},
			onProgress,
		});

		const reported = onProgress.mock.calls.map(([saved]) => saved);
		expect(reported.slice(0, 2)).toEqual([
			1,
			2,
		]);
		expect(reported).toContain(101);
		expect(reported.at(-1)).toBe(102);
	});

	it('wraps a failed chunk into an error with its range', async () => {
		await expect(
			splitAndSaveData({
				data: rows(150),
				saveCallback: (chunk) =>
					chunk.length < 100 ? Promise.reject(new Error('nope')) : undefined,
			}),
		).rejects.toThrow('100-200 data chunk');
	});
});
