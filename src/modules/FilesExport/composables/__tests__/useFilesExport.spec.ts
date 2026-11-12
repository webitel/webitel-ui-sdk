import { beforeEach, describe, expect, it, vi } from 'vitest';
import { saveZip } from '../../utils/utils';
import { useFilesExport } from '../useFilesExport';

vi.mock('jszip', () => ({
	default: class {
		file = vi.fn();
		generateAsync = vi.fn(() => Promise.resolve(new Blob()));
	},
}));
vi.mock('../../utils/utils', async (importOriginal) => ({
	...(await importOriginal<typeof import('../../utils/utils')>()),
	saveZip: vi.fn(),
}));
vi.mock('../../../../scripts/logger', () => ({
	_wtUiLog: {
		warn: () => () => {},
	},
}));

const items = [
	{
		id: 1,
		name: 'a.mp3',
	},
	{
		id: 2,
		name: 'b.mp3',
	},
	{
		id: 3,
		name: 'c.mp3',
	},
];

const setup = (failedIds: number[], skipFilesWithError = true) =>
	useFilesExport({
		fetch: () =>
			Promise.resolve({
				items,
				next: false,
			}),
		getFileBlob: (item) =>
			failedIds.includes(item.id as number)
				? Promise.reject(new Error('fail'))
				: Promise.resolve(new Blob()),
		skipFilesWithError,
	});

describe('useFilesExport', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('saves zip and reports counts when all files are downloaded', async () => {
		const { exportFiles } = setup([]);

		await expect(exportFiles()).resolves.toEqual({
			downloaded: 3,
			skipped: 0,
		});
		expect(saveZip).toHaveBeenCalledTimes(1);
	});

	it('saves zip without failed files when skipFilesWithError is set', async () => {
		const { exportFiles } = setup([
			2,
		]);

		await expect(exportFiles()).resolves.toEqual({
			downloaded: 2,
			skipped: 1,
		});
		expect(saveZip).toHaveBeenCalledTimes(1);
	});

	it('fails without saving zip when every file fails, even with skipFilesWithError', async () => {
		const { exportFiles } = setup([
			1,
			2,
			3,
		]);

		await expect(exportFiles()).rejects.toThrow('fail');
		expect(saveZip).not.toHaveBeenCalled();
	});

	it('fails on the first failed file without skipFilesWithError', async () => {
		const { exportFiles } = setup(
			[
				2,
			],
			false,
		);

		await expect(exportFiles()).rejects.toThrow('fail');
		expect(saveZip).not.toHaveBeenCalled();
	});
});
