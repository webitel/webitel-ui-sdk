import { describe, expect, it } from 'vitest';

import { isSafeUrlScheme } from '../isSafeUrlScheme';

describe('isSafeUrlScheme', () => {
	it.each([
		'https://example.test/file.pdf',
		'http://example.test/file.pdf',
		'blob:https://example.test/0d1f',
		'/api/storage/file/1/download',
		'file.pdf',
		'//example.test/file.pdf',
	])('allows %s', (url) => {
		expect(isSafeUrlScheme(url)).toBe(true);
	});

	it.each([
		'javascript:alert(1)',
		'JavaScript:alert(1)',
		'vbscript:msgbox(1)',
		'data:text/html,<script>alert(1)</script>',
		'file:///etc/passwd',
		'smb://example.test/share',
		'ms-settings://x',
		'wtel:test;x=1',
	])('refuses %s', (url) => {
		expect(isSafeUrlScheme(url)).toBe(false);
	});

	it.each([
		undefined,
		null,
		'',
	])('refuses the empty value %s', (url) => {
		expect(isSafeUrlScheme(url)).toBe(false);
	});

	it('refuses a javascript: url split by control characters', () => {
		// browsers strip tabs and newlines before resolving a scheme, so the
		// guard must not be fooled by them either
		expect(isSafeUrlScheme('java\tscript:alert(1)')).toBe(false);
		expect(isSafeUrlScheme('java\nscript:alert(1)')).toBe(false);
	});
});
