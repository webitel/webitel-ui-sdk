import { describe, expect, it } from 'vitest';

import {
	isSafeAttachmentUrl,
	toSafeAttachmentUrl,
} from '../isSafeAttachmentUrl';

const SAFE_URL = 'https://example.test/file.pdf';
const UNSAFE_URL = 'javascript:alert(1)';

// `@webitel/ui-sdk` owns the scheme matrix; this only checks the wiring
describe('isSafeAttachmentUrl', () => {
	it('allows a safe url', () => {
		expect(isSafeAttachmentUrl(SAFE_URL)).toBe(true);
	});

	it('refuses an unsafe url', () => {
		expect(isSafeAttachmentUrl(UNSAFE_URL)).toBe(false);
	});
});

describe('toSafeAttachmentUrl', () => {
	it('returns a safe url as is', () => {
		expect(toSafeAttachmentUrl(SAFE_URL)).toBe(SAFE_URL);
	});

	it('drops an unsafe url', () => {
		expect(toSafeAttachmentUrl(UNSAFE_URL)).toBeUndefined();
	});
});
