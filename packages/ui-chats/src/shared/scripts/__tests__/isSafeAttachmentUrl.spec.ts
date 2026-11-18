import { describe, expect, it } from 'vitest';

import { isPlayableAttachmentUrl } from '../isSafeAttachmentUrl';

// scheme cases live in `@webitel/ui-sdk`; the sinks' own specs cover the wiring
describe('isPlayableAttachmentUrl', () => {
	it.each([
		'https://example.test/a.mpd',
		'https://example.test/a.M3U8?token=1',
	])('refuses the stream manifest %s', (url) => {
		expect(isPlayableAttachmentUrl(url)).toBe(false);
	});
});
