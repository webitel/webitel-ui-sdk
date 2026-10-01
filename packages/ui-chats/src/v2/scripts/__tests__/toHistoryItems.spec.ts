import { describe, expect, it } from 'vitest';

import { toHistoryItems } from '../toHistoryItems';
import { message } from './fixtures';

const at = (y: number, m: number, d: number, h = 12) =>
	String(new Date(y, m, d, h).getTime());

describe('toHistoryItems', () => {
	it('opens each local day with one divider', () => {
		const items = toHistoryItems([
			message({
				createdAt: at(2026, 8, 15, 9),
			}),
			message({
				createdAt: at(2026, 8, 15, 18),
			}),
			message({
				createdAt: at(2026, 8, 16, 9),
			}),
		]);
		expect(items.map((item) => item.kind)).toEqual([
			'divider',
			'message',
			'message',
			'divider',
			'message',
		]);
	});

	it('marks system messages as system rows', () => {
		const items = toHistoryItems([
			message({
				system: {
					type: 'transferred',
				},
			}),
		]);
		expect(items.at(-1)?.kind).toBe('system');
	});

	it('does not open a day for an item without createdAt', () => {
		const items = toHistoryItems([
			message({
				createdAt: undefined,
			}),
			message({
				createdAt: '0',
			}),
		]);
		expect(items.map((item) => item.kind)).toEqual([
			'message',
			'message',
		]);
	});

	it('keys message rows by message id', () => {
		const first = message();
		expect(
			toHistoryItems([
				first,
			]).at(-1)?.key,
		).toBe(first.id);
	});

	it('keeps row keys unique when a day shows up twice out of order', () => {
		const items = toHistoryItems([
			message({
				createdAt: at(2026, 8, 15),
			}),
			message({
				createdAt: at(2026, 8, 16),
			}),
			message({
				createdAt: at(2026, 8, 15, 23),
			}),
		]);
		const keys = items.map((item) => item.key);
		expect(new Set(keys).size).toBe(keys.length);
	});
});
