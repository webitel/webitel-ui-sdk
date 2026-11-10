import { describe, expect, it } from 'vitest';

import { mapMessageToChatMessage } from '../toChatMessage';

describe('toChatMessage attachment urls', () => {
	it.each([
		'javascript:alert(1)',
		'data:text/html,<script>alert(1)</script>',
		'file:///etc/passwd',
	])('drops an image url of %s', (url) => {
		const result = mapMessageToChatMessage({
			id: '1',
			images: [
				{
					id: 'i1',
					url,
					mime: 'image/png',
				},
			],
		} as never);

		expect(result.file?.url).toBeUndefined();
	});

	it.each([
		'javascript:alert(1)',
		'data:application/pdf;base64,AAAA',
	])('drops a document url of %s', (url) => {
		const result = mapMessageToChatMessage({
			id: '1',
			documents: [
				{
					id: 'd1',
					url,
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
