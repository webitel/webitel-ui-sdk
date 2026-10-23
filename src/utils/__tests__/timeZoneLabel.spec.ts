import { describe, expect, it } from 'vitest';

import { formatTimeZoneLabel } from '../timeZoneLabel';

const winter = new Date('2026-01-15T12:00:00Z');

describe('formatTimeZoneLabel', () => {
	it('builds the tooltip caption from an IANA id', () => {
		expect(formatTimeZoneLabel('Africa/Addis_Ababa', winter)).toBe(
			'Africa/Addis_Ababa 03:00',
		);
		expect(formatTimeZoneLabel('UTC', winter)).toBe('UTC 00:00');
		expect(formatTimeZoneLabel('America/New_York', winter)).toBe(
			'America/New_York -05:00',
		);
	});

	it('keeps a caption that already includes an offset', () => {
		expect(formatTimeZoneLabel('Europe/Kyiv 02:00', winter)).toBe(
			'Europe/Kyiv 02:00',
		);
		expect(formatTimeZoneLabel('Europe/Kyiv +02:00', winter)).toBe(
			'Europe/Kyiv +02:00',
		);
		expect(formatTimeZoneLabel('America/New_York -05:00', winter)).toBe(
			'America/New_York -05:00',
		);
	});

	it('returns an empty caption unchanged', () => {
		expect(formatTimeZoneLabel('')).toBe('');
	});
});
