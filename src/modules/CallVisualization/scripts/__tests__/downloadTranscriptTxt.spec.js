import { saveAs } from 'file-saver-es';

import { downloadTranscriptTxt } from '../downloadTranscriptTxt';

vi.mock('file-saver-es');

describe('downloadTranscriptTxt', () => {
	it('calls saveAs with transcript file name', () => {
		downloadTranscriptTxt({
			rows: [],
			transcriptId: 'jest',
			callCreatedAt: '123',
		});
		expect(saveAs).toHaveBeenCalledWith(
			expect.any(Blob),
			'Transcript jest 123',
		);
	});
});
