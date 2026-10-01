import { describe, expect, it } from 'vitest';

import { formatDividerDate, formatMessageTime } from '../formatDate';

const now = new Date(2026, 9, 1, 15).getTime();

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
			formatDividerDate(new Date(2026, 8, 15).getTime(), {
				locale: 'en',
				todayLabel: 'Today',
				now,
			}),
		).toBe('September 15');
	});

	it('adds the year for other years', () => {
		expect(
			formatDividerDate(new Date(2025, 8, 15).getTime(), {
				locale: 'en',
				todayLabel: 'Today',
				now,
			}),
		).toBe('September 15, 2025');
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
	it('is 24-hour HH:mm', () => {
		expect(formatMessageTime(new Date(2026, 9, 1, 9, 5).getTime(), 'en')).toBe(
			'09:05',
		);
		expect(
			formatMessageTime(new Date(2026, 9, 1, 22, 40).getTime(), 'en'),
		).toBe('22:40');
	});
});
