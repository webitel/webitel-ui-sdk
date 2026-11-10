import { describe, expect, it } from 'vitest';

import { isSafeAttachmentUrl } from '../isSafeAttachmentUrl';

/** `@webitel/ui-sdk` owns the scheme matrix; this only checks the wiring. */
describe('isSafeAttachmentUrl', () => {
	it.each([
		'https://example.test/file.pdf',
		'http://example.test/file.pdf',
		'/api/storage/file/1/download',
	])('allows %s', (url) => {
		expect(isSafeAttachmentUrl(url)).toBe(true);
	});

	it.each([
		'javascript:alert(1)',
		'data:text/html,<script>alert(1)</script>',
		'smb://example.test/share',
	])('refuses %s', (url) => {
		expect(isSafeAttachmentUrl(url)).toBe(false);
	});

	it('refuses an empty value', () => {
		expect(isSafeAttachmentUrl(undefined)).toBe(false);
	});
});
