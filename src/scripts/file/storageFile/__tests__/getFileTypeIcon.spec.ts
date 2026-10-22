import { describe, expect, it } from 'vitest';

import { getFileTypeIcon } from '../getFileTypeIcon';

describe('getFileTypeIcon', () => {
	it.each([
		[
			'image/png',
			'preview-tag-image',
		],
		[
			'video/mp4',
			'preview-tag-video',
		],
		[
			'audio/wav',
			'preview-tag-audio',
		],
		[
			'application/pdf',
			'preview-tag-application',
		],
		[
			'text/plain',
			'attach',
		],
		[
			undefined,
			'attach',
		],
	])('%s → %s', (mimeType, icon) => {
		expect(getFileTypeIcon(mimeType)).toBe(icon);
	});

	it('uses the given fallback for an unknown type', () => {
		expect(
			getFileTypeIcon('text/plain', {
				fallback: 'docs',
			}),
		).toBe('docs');
	});
});
