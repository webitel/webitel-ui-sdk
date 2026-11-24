import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRecorderCore } from '../recorder-core';
import type { RecorderStorage } from '../storage';
import type { RecorderEvent, StoredRecord } from '../types';

function memoryStorage(meta: Record<string, unknown> = {}) {
	const records: StoredRecord[] = [];
	const storage: RecorderStorage = {
		append: async (batch) => {
			records.push(...batch);
		},
		readAll: async () => records,
		clear: async () => {
			records.length = 0;
		},
		stats: async () => ({
			records: records.length,
			chars: 0,
			firstT: null,
			lastT: null,
			byChannel: {},
		}),
		getMeta: async <T>(key: string) => meta[key] as T,
		setMeta: async (key, value) => {
			meta[key] = value;
		},
		listMeta: async <T>(prefix: string) =>
			Object.entries(meta).filter(([key]) => key.startsWith(prefix)) as [
				string,
				T,
			][],
		takeMeta: async <T>(key: string) => {
			const value = meta[key] as T | undefined;
			delete meta[key];
			return value;
		},
		close: () => {},
	};
	const events = () => records.map((r) => JSON.parse(r.json) as RecorderEvent);
	return {
		storage,
		meta,
		events,
	};
}

const init = (sid: string, cleanExitSids: string[] = [], app = 'admin') => ({
	kind: 'init' as const,
	sid,
	app,
	t: Date.now(),
	cleanExitSids,
});

const previous = (events: RecorderEvent[]) =>
	events.filter((e) => e.type === 'previous-session').map((e) => e.data);

describe('recorder core', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(1_000_000);
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('writes a stall record while the main thread is silent, and closes it on the next heartbeat', async () => {
		const { storage, meta, events } = memoryStorage();
		const core = createRecorderCore(storage);
		await core.handle(init('s1'));
		await core.handle({
			kind: 'hb',
			t: Date.now(),
		});

		vi.advanceTimersByTime(5_000);
		await core.checkStall();
		expect(events().map((e) => e.type)).toEqual([
			'main-thread-stall-start',
		]);
		// persisted right away: survives a reload of the frozen page
		expect(meta['session:s1']).toMatchObject({
			stallSince: 1_000_000,
		});

		await core.handle({
			kind: 'hb',
			t: Date.now(),
		});
		expect(events().at(-1)).toMatchObject({
			type: 'main-thread-stall-end',
			data: {
				durationMs: 5_000,
			},
		});
		expect(meta['session:s1']).toMatchObject({
			stallSince: null,
		});
	});

	it('does not report a stall while the tab is hidden', async () => {
		const { storage, events } = memoryStorage();
		const core = createRecorderCore(storage);
		await core.handle(init('s1'));
		await core.handle({
			kind: 'hb',
			t: Date.now(),
		});
		await core.handle({
			kind: 'visibility',
			hidden: true,
		});
		vi.advanceTimersByTime(60_000);
		await core.checkStall();
		expect(events()).toEqual([]);
	});

	it('reports a page load that went silent without a clean exit, with its app', async () => {
		const { storage, meta, events } = memoryStorage({
			'session:old': {
				app: 'workspace',
				lastHeartbeat: 1_000_000 - 20_000,
				stallSince: 1_000_000 - 21_000,
			},
		});
		await createRecorderCore(storage).handle(init('new'));
		expect(events()).toEqual([
			expect.objectContaining({
				sid: 'new',
				app: 'admin',
				type: 'previous-session',
				data: {
					sid: 'old',
					app: 'workspace',
					lastHeartbeat: 980_000,
					stallSince: 979_000,
					cleanExit: false,
				},
			}),
		]);
		expect(meta['session:old']).toBeUndefined();
		expect(meta['session:new']).toMatchObject({
			app: 'admin',
		});
	});

	it('reports a clean exit at once, even with a fresh heartbeat', async () => {
		const { storage, events } = memoryStorage({
			'session:old': {
				app: 'auth',
				lastHeartbeat: 1_000_000 - 500,
			},
		});
		await createRecorderCore(storage).handle(
			init('new', [
				'old',
			]),
		);
		expect(previous(events())).toEqual([
			expect.objectContaining({
				sid: 'old',
				app: 'auth',
				cleanExit: true,
			}),
		]);
	});

	it('leaves page loads of other open tabs alone; hidden tabs get more slack', async () => {
		const { storage, meta, events } = memoryStorage({
			'session:open-tab': {
				app: 'workspace',
				lastHeartbeat: 1_000_000 - 5_000,
			},
			'session:background-tab': {
				app: 'crm',
				lastHeartbeat: 1_000_000 - 60_000,
				hidden: true,
			},
			'session:gone-background-tab': {
				app: 'crm',
				lastHeartbeat: 1_000_000 - 4 * 60_000,
				hidden: true,
			},
		});
		await createRecorderCore(storage).handle(init('new'));
		expect(previous(events())).toEqual([
			expect.objectContaining({
				sid: 'gone-background-tab',
				cleanExit: false,
			}),
		]);
		expect(meta['session:open-tab']).toBeDefined();
		expect(meta['session:background-tab']).toBeDefined();
	});

	it('reports an ended page load once when two tabs start together', async () => {
		const shared = memoryStorage({
			'session:old': {
				app: 'admin',
				lastHeartbeat: 1_000_000 - 30_000,
			},
		});
		await Promise.all([
			createRecorderCore(shared.storage).handle(init('a')),
			createRecorderCore(shared.storage).handle(init('b')),
		]);
		expect(previous(shared.events())).toHaveLength(1);
	});
});
