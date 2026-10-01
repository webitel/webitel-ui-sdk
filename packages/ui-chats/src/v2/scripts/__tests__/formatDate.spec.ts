import { afterEach, describe, expect, it } from 'vitest';

import { formatDividerDate, formatMessageTime } from '../formatDate';

const now = new Date(2026, 9, 1, 15).getTime();

// 21:30 UTC on Sep 15 is already 00:30 on Sep 16 in Kyiv (UTC+3)
const lateEveningUtc = Date.UTC(2026, 8, 15, 21, 30);

describe('formatDividerDate', () => {
	it('says Today for today', () => {
		expect(
			formatDividerDate(new Date(2026, 9, 1, 8).getTime(), {
				locale: 'en',
				todayLabel: 'Today',
				now,
			}),
		).toBe('Today');
	});

	it('shows month and day within the current year', () => {
		expect(
			formatDividerDate(new Date(2026, 8, 15, 12).getTime(), {
				locale: 'en',
				todayLabel: 'Today',
				now,
			}),
		).toBe('September 15');
	});

	it('adds the year for other years', () => {
		expect(
			formatDividerDate(new Date(2025, 8, 15, 12).getTime(), {
				locale: 'en',
				todayLabel: 'Today',
				now,
			}),
		).toBe('September 15, 2025');
	});

	it('names the day in the given time zone', () => {
		const options = {
			locale: 'en',
			todayLabel: 'Today',
			now,
		};
		expect(
			formatDividerDate(lateEveningUtc, {
				...options,
				timeZone: 'UTC',
			}),
		).toBe('September 15');
		expect(
			formatDividerDate(lateEveningUtc, {
				...options,
				timeZone: 'Europe/Kyiv',
			}),
		).toBe('September 16');
	});

	it('does not throw on app-only locale codes', () => {
		expect(() =>
			formatDividerDate(new Date(2025, 0, 2).getTime(), {
				locale: 'kz',
				todayLabel: 'Бүгін',
				now,
			}),
		).not.toThrow();
	});
});

describe('formatMessageTime', () => {
	afterEach(() => {
		localStorage.removeItem('user-timezone-setting');
	});

	it('is 24-hour HH:mm', () => {
		expect(formatMessageTime(new Date(2026, 9, 1, 9, 5).getTime())).toBe(
			'09:05',
		);
		expect(formatMessageTime(new Date(2026, 9, 1, 22, 40).getTime())).toBe(
			'22:40',
		);
	});

	it('uses the given time zone', () => {
		expect(formatMessageTime(lateEveningUtc, 'UTC')).toBe('21:30');
		expect(formatMessageTime(lateEveningUtc, 'Europe/Kyiv')).toBe('00:30');
	});

	// the same setting the rest of the app formats dates with
	it('defaults to the operator’s time zone setting', () => {
		localStorage.setItem('user-timezone-setting', 'Asia/Tokyo');
		expect(formatMessageTime(lateEveningUtc)).toBe('06:30');
	});
});
