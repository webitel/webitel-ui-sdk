import { beforeEach, describe, expect, it, vi } from 'vitest';

const downloadCallScreenrecordingArchive = vi.fn();

vi.mock('../../../../gen-wire', async () => {
	const actual = await vi.importActual<typeof import('../../../../gen-wire')>(
		'../../../../gen-wire',
	);

	return {
		...actual,
		getPdfService: () => ({
			downloadCallScreenrecordingArchive,
		}),
	};
});

const { PdfServicesAPI } = await import('../pdfServices');

describe('PdfServicesAPI.downloadCallScreenrecordingArchive', () => {
	beforeEach(() => {
		downloadCallScreenrecordingArchive.mockReset();
	});

	it('requests a blob archive with snake_case query params', async () => {
		const response = {
			data: new Blob([
				'zip',
			]),
		};
		downloadCallScreenrecordingArchive.mockResolvedValue(response);

		await expect(
			PdfServicesAPI.downloadCallScreenrecordingArchive({
				callId: 'call-1',
				fileIds: [
					'123',
					'456',
				],
				from: '1700000000000',
				to: '170000000100000',
			}),
		).resolves.toBe(response);

		expect(downloadCallScreenrecordingArchive).toHaveBeenCalledWith(
			'call-1',
			{
				file_ids: [
					'123',
					'456',
				],
				from: '1700000000000',
				to: '170000000100000',
			},
			{
				responseType: 'blob',
			},
		);
	});
});
