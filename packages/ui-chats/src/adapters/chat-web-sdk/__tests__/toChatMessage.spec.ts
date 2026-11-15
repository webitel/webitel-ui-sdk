import { describe, expect, it } from 'vitest';

import { mapMessageToChatMessage } from '../toChatMessage';

const UNSAFE_URL = 'javascript:alert(1)';

describe('toChatMessage attachment urls', () => {
	it('drops an unsafe image url', () => {
		const result = mapMessageToChatMessage({
			id: '1',
			images: [
				{
					id: 'i1',
					url: UNSAFE_URL,
					mime: 'image/png',
				},
			],
		} as never);

		expect(result.file?.url).toBeUndefined();
	});

	it('drops an unsafe document url', () => {
		const result = mapMessageToChatMessage({
			id: '1',
			documents: [
				{
					id: 'd1',
					url: UNSAFE_URL,
					name: 'r.pdf',
					mime: 'application/pdf',
				},
			],
		} as never);

		expect(result.file?.url).toBeUndefined();
		// the name survives, so the UI can still list the attachment
		expect(result.file?.name).toBe('r.pdf');
	});

	it('keeps a storage url', () => {
		const result = mapMessageToChatMessage({
			id: '1',
			documents: [
				{
					id: 'd1',
					url: 'https://example.test/storage/file/1/download',
					name: 'r.pdf',
					mime: 'application/pdf',
				},
			],
		} as never);

		expect(result.file?.url).toBe(
			'https://example.test/storage/file/1/download',
		);
	});
});
