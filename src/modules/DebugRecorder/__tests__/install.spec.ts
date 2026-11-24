import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { RecorderStorage } from '../storage';
import type { StoredRecord } from '../types';

const records: StoredRecord[] = [];
vi.mock('../storage', () => ({
	openStorage: async (): Promise<RecorderStorage> => ({
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
		getMeta: async () => undefined,
		setMeta: async () => {},
		listMeta: async () => [],
		takeMeta: async () => undefined,
		close: () => {},
	}),
}));

// the chip is covered by indicator.spec; here its lazy Vue import would outlive the test
vi.mock('../indicator', () => ({
	showIndicator: () => () => {},
	flash: () => {},
}));

// no Worker in the test DOM: the sink falls back to the (mocked) inline store
class NoWorker {
	constructor() {
		throw new Error('no workers here');
	}
}

const HOUR = 60 * 60 * 1000;
const MINUTE = 60 * 1000;

async function load() {
	vi.resetModules();
	const config = await import('../config');
	const install = await import('../install');
	const hooks = await import('../../../scripts/sessionHooks');
	return {
		...config,
		...install,
		...hooks,
	};
}

const logged = () =>
	records.map((r) => JSON.parse(r.json)).filter((e) => e.ch === 'console');

describe('installDebugRecorder', () => {
	beforeEach(() => {
		vi.stubGlobal('Worker', NoWorker);
		delete (globalThis as Record<symbol, unknown>)[
			Symbol.for('webitel.ui-sdk.session-hooks')
		];
		delete (window as Partial<Window>).webitelDebug;
		localStorage.clear();
		records.length = 0;
	});
	afterEach(() => {
		vi.unstubAllGlobals();
		window.history.replaceState(null, '', '/');
	});

	it('removes stores of earlier versions, records nothing while off', async () => {
		localStorage.setItem('wt-debug-recorder', String(Date.now() + 60_000));
		localStorage.setItem('wt-debug-recorder:workspace:has-data', '1');
		localStorage.setItem('wt-debug-recorder:admin:clean-exit', 'sid');
		const { installDebugRecorder } = await load();

		const api = installDebugRecorder({
			app: 'test',
		});

		expect(api.recording).toBe(false);
		expect(api.enabledUntil).toBeNull();
		expect(window.webitelDebug).toBe(api);
		expect(() => {
			(
				window as {
					webitelDebug?: unknown;
				}
			).webitelDebug = {};
		}).toThrow(TypeError);
		expect(window.webitelDebug).toBe(api);
		expect(
			Object.keys(localStorage).filter((k) => k.startsWith('wt-debug')),
		).toEqual([]);
	});

	it('deletes everything on logout through the Userinfo hook', async () => {
		const { installDebugRecorder, runBeforeLogout, setEnabled, STORAGE } =
			await load();
		setEnabled(true);
		const api = installDebugRecorder({
			app: 'admin',
		});
		expect(api.recording).toBe(true);

		await runBeforeLogout();

		expect(api.recording).toBe(false);
		expect(localStorage.getItem(STORAGE.enabled)).toBeNull();
		expect(localStorage.getItem(STORAGE.hasData)).toBeNull();
	});

	it('deletes the previous user’s records when another user signs in', async () => {
		const { installDebugRecorder, notifySessionUser, setEnabled, STORAGE } =
			await load();
		const now = Date.now();
		setEnabled(true, now - 2 * HOUR);
		localStorage.setItem(
			STORAGE.owner,
			JSON.stringify({
				id: 'alice',
				at: now - HOUR,
			}),
		);
		const api = installDebugRecorder({
			app: 'admin',
		});

		notifySessionUser('bob');

		await vi.waitFor(() => expect(api.recording).toBe(false));
		expect(localStorage.getItem(STORAGE.enabled)).toBeNull();
		expect(localStorage.getItem(STORAGE.owner)).toBeNull();
	});

	it('keeps recording, with a clean store, when the new user switched it on after the previous one left', async () => {
		const { installDebugRecorder, notifySessionUser, setEnabled, STORAGE } =
			await load();
		const now = Date.now();
		localStorage.setItem(
			STORAGE.owner,
			JSON.stringify({
				id: 'alice',
				at: now - 2 * HOUR,
			}),
		);
		setEnabled(true, now - 10 * MINUTE);
		const api = installDebugRecorder({
			app: 'auth',
		});
		console.log('before sign-in');

		notifySessionUser('bob');

		await vi.waitFor(() =>
			expect(JSON.parse(localStorage.getItem(STORAGE.owner) ?? '{}').id).toBe(
				'bob',
			),
		);
		expect(api.recording).toBe(true);
		expect(localStorage.getItem(STORAGE.enabled)).not.toBeNull();
		await vi.waitFor(() => expect(logged()).toEqual([]));
	});

	it('binds the records to the first user that signs in', async () => {
		const { installDebugRecorder, notifySessionUser, setEnabled, STORAGE } =
			await load();
		setEnabled(true);
		installDebugRecorder({
			app: 'auth',
		});

		notifySessionUser(42);

		await vi.waitFor(() =>
			expect(JSON.parse(localStorage.getItem(STORAGE.owner) ?? '{}').id).toBe(
				'42',
			),
		);
	});

	it('stops when another tab switches recording off', async () => {
		const { installDebugRecorder, setEnabled, STORAGE } = await load();
		setEnabled(true);
		const api = installDebugRecorder({
			app: 'workspace',
		});

		window.dispatchEvent(
			new StorageEvent('storage', {
				key: STORAGE.enabled,
				newValue: null,
			}),
		);

		await vi.waitFor(() => expect(api.recording).toBe(false));
	});

	it('records again after stop + enable on the same page', async () => {
		const { installDebugRecorder, setEnabled } = await load();
		setEnabled(true);
		const api = installDebugRecorder({
			app: 'admin',
		});
		await api.disable();
		expect(api.recording).toBe(false);

		api.enable();
		console.log('after re-enable');

		expect(api.recording).toBe(true);
		const dumped = await (
			api as unknown as {
				stats(): Promise<{
					records: number;
				} | null>;
			}
		).stats();
		expect(dumped?.records).toBeGreaterThan(0);
		await vi.waitFor(() =>
			expect(logged().map((e) => e.data.args[0])).toContain('after re-enable'),
		);
	});
});

describe('installDebugRecorder: whose records', () => {
	beforeEach(() => {
		vi.stubGlobal('Worker', NoWorker);
		delete (globalThis as Record<symbol, unknown>)[
			Symbol.for('webitel.ui-sdk.session-hooks')
		];
		delete (window as Partial<Window>).webitelDebug;
		localStorage.clear();
		records.length = 0;
	});
	afterEach(() => {
		vi.unstubAllGlobals();
		window.history.replaceState(null, '', '/');
	});

	it('does not keep recording the next user when the previous one switched it on', async () => {
		const { installDebugRecorder, notifySessionUser, setEnabled, STORAGE } =
			await load();
		const now = Date.now();
		localStorage.setItem(
			STORAGE.owner,
			JSON.stringify({
				id: 'alice',
				at: now - 2 * HOUR,
			}),
		);
		setEnabled(true, now - 10 * MINUTE);
		localStorage.setItem(STORAGE.enabledBy, 'alice');
		const api = installDebugRecorder({
			app: 'admin',
		});

		notifySessionUser('bob');

		await vi.waitFor(() => expect(api.recording).toBe(false));
		expect(localStorage.getItem(STORAGE.enabled)).toBeNull();
	});

	it('refuses the archive before sign-in once the records belong to a user', async () => {
		const { installDebugRecorder, notifySessionUser, setEnabled, STORAGE } =
			await load();
		setEnabled(true);
		localStorage.setItem(
			STORAGE.owner,
			JSON.stringify({
				id: 'alice',
				at: Date.now(),
			}),
		);
		const api = installDebugRecorder({
			app: 'auth',
		});
		expect(await api.stats()).toBeNull();

		notifySessionUser('alice');
		await vi.waitFor(async () => expect(await api.stats()).not.toBeNull());
	});

	it('lets anyone read records that no user owns yet (sign-in itself fails)', async () => {
		const { installDebugRecorder, setEnabled } = await load();
		setEnabled(true);
		const api = installDebugRecorder({
			app: 'auth',
		});
		expect(await api.stats()).not.toBeNull();
	});

	it('starts a fresh store when ?debug=1 switches recording on', async () => {
		const { installDebugRecorder, STORAGE } = await load();
		localStorage.setItem(STORAGE.hasData, '1');
		localStorage.setItem(
			STORAGE.owner,
			JSON.stringify({
				id: 'alice',
				at: Date.now() - HOUR,
			}),
		);
		window.history.replaceState(null, '', '/app/auth/?debug=1');

		const api = installDebugRecorder({
			app: 'auth',
		});

		expect(api.recording).toBe(true);
		expect(localStorage.getItem(STORAGE.owner)).toBeNull();
		expect(localStorage.getItem(STORAGE.enabledBy)).toBe('');
	});
});

describe('installDebugRecorder: owner from the first moment', () => {
	beforeEach(() => {
		vi.stubGlobal('Worker', NoWorker);
		delete (globalThis as Record<symbol, unknown>)[
			Symbol.for('webitel.ui-sdk.session-hooks')
		];
		delete (window as Partial<Window>).webitelDebug;
		localStorage.clear();
		records.length = 0;
	});
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('binds records to the signed-in user who switches recording on', async () => {
		const { installDebugRecorder, notifySessionUser, STORAGE } = await load();
		const api = installDebugRecorder({
			app: 'admin',
		});
		notifySessionUser('alice');

		api.enable();

		expect(JSON.parse(localStorage.getItem(STORAGE.owner) ?? '{}').id).toBe(
			'alice',
		);
	});

	it('wipes an ownerless store that another user switched on', async () => {
		const { installDebugRecorder, notifySessionUser, setEnabled, STORAGE } =
			await load();
		setEnabled(true);
		localStorage.setItem(STORAGE.enabledBy, 'alice');
		const api = installDebugRecorder({
			app: 'admin',
		});

		notifySessionUser('bob');

		await vi.waitFor(() => expect(api.recording).toBe(false));
		expect(localStorage.getItem(STORAGE.enabled)).toBeNull();
	});
});

describe('installDebugRecorder: review fixes', () => {
	beforeEach(() => {
		vi.stubGlobal('Worker', NoWorker);
		delete (globalThis as Record<symbol, unknown>)[
			Symbol.for('webitel.ui-sdk.session-hooks')
		];
		delete (globalThis as Record<symbol, unknown>)[
			Symbol.for('webitel.ui-sdk.debug-recorder')
		];
		delete (window as Partial<Window>).webitelDebug;
		localStorage.clear();
		records.length = 0;
	});
	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
	});

	it('stops an open tab once the flag expires, without a reload', async () => {
		vi.useFakeTimers({
			shouldAdvanceTime: true,
		});
		const { EXPIRY_CHECK_MS, installDebugRecorder, setEnabled, STORAGE } =
			await load();
		setEnabled(true);
		const api = installDebugRecorder({
			app: 'workspace',
		});
		expect(api.recording).toBe(true);

		console.log('recorded before the end');
		localStorage.setItem(STORAGE.enabled, String(Date.now() - 1));
		await vi.advanceTimersByTimeAsync(EXPIRY_CHECK_MS);

		await vi.waitFor(() => expect(api.recording).toBe(false));
		// time is up: recording stops, the records stay as an archive
		expect(api.archived).toBe(true);
		expect(localStorage.getItem(STORAGE.enabled)).toBeNull();
		expect(localStorage.getItem(STORAGE.hasData)).toBe('1');
		expect(Number(localStorage.getItem(STORAGE.endedAt))).toBeGreaterThan(0);
		expect(logged().map((e) => e.data.args[0])).toContain(
			'recorded before the end',
		);
		expect((await api.stats())?.records).toBe(records.length);
	});

	it('restarts a tab still recording past the expiry when switched on again', async () => {
		const { installDebugRecorder, setEnabled, STORAGE } = await load();
		setEnabled(true);
		const api = installDebugRecorder({
			app: 'admin',
		});
		localStorage.setItem(STORAGE.enabled, String(Date.now() - 1));

		await api.enable();
		console.log('after re-enable');

		expect(api.recording).toBe(true);
		expect(api.enabledUntil).not.toBeNull();
		await vi.waitFor(() =>
			expect(logged().map((e) => e.data.args[0])).toContain('after re-enable'),
		);
	});

	it('empties the store in place on a user change in a tab that does not record', async () => {
		const { installDebugRecorder, notifySessionUser, setEnabled, STORAGE } =
			await load();
		installDebugRecorder({
			app: 'admin',
		});
		const now = Date.now();
		localStorage.setItem(
			STORAGE.owner,
			JSON.stringify({
				id: 'alice',
				at: now - 2 * HOUR,
			}),
		);
		setEnabled(true, now - 10 * MINUTE);
		localStorage.setItem(STORAGE.hasData, '1');
		records.push({
			t: now,
			ch: 'console',
			sid: 'alice-tab',
			type: 'log',
			n: 2,
			json: '{}',
		});

		notifySessionUser('bob');

		await vi.waitFor(() =>
			expect(JSON.parse(localStorage.getItem(STORAGE.owner) ?? '{}').id).toBe(
				'bob',
			),
		);
		expect(records).toEqual([]);
		expect(localStorage.getItem(STORAGE.enabled)).not.toBeNull();
	});

	it('lets another copy of the module stop the recording one', async () => {
		const first = await load();
		first.setEnabled(true);
		const api = first.installDebugRecorder({
			app: 'admin',
		});
		expect(api.recording).toBe(true);

		const second = await load();
		await second.wipeDebugRecorder();

		expect(api.recording).toBe(false);
	});
});

describe('installDebugRecorder: archive after the time is up', () => {
	beforeEach(() => {
		vi.stubGlobal('Worker', NoWorker);
		delete (globalThis as Record<symbol, unknown>)[
			Symbol.for('webitel.ui-sdk.session-hooks')
		];
		delete (globalThis as Record<symbol, unknown>)[
			Symbol.for('webitel.ui-sdk.debug-recorder')
		];
		delete (window as Partial<Window>).webitelDebug;
		localStorage.clear();
		records.length = 0;
		records.push({
			t: Date.now() - 2 * HOUR,
			ch: 'console',
			sid: 'earlier-tab',
			app: 'admin',
			type: 'log',
			n: 2,
			json: '{}',
		});
	});
	afterEach(() => {
		vi.unstubAllGlobals();
		window.history.replaceState(null, '', '/');
	});

	it('keeps the archive when the hour ran out while no tab was open', async () => {
		const { installDebugRecorder, setEnabled, STORAGE } = await load();
		setEnabled(true, Date.now() - 2 * HOUR);
		localStorage.setItem(STORAGE.hasData, '1');

		const api = installDebugRecorder({
			app: 'admin',
		});

		expect(api.recording).toBe(false);
		expect(api.archived).toBe(true);
		expect(localStorage.getItem(STORAGE.endedAt)).not.toBeNull();
		expect((await api.stats())?.records).toBe(1);
	});

	it('keeps the archive on ?debug=0', async () => {
		const { installDebugRecorder, setEnabled, STORAGE } = await load();
		setEnabled(true);
		localStorage.setItem(STORAGE.hasData, '1');
		window.history.replaceState(null, '', '/?debug=0');

		const api = installDebugRecorder({
			app: 'admin',
		});

		expect(api.recording).toBe(false);
		expect(api.archived).toBe(true);
		expect(records).toHaveLength(1);
	});

	it('deletes an archive older than the retention at load', async () => {
		const { installDebugRecorder, RETENTION_MS, STORAGE } = await load();
		localStorage.setItem(STORAGE.hasData, '1');
		localStorage.setItem(
			STORAGE.endedAt,
			String(Date.now() - RETENTION_MS - 1),
		);

		const api = installDebugRecorder({
			app: 'admin',
		});

		expect(api.archived).toBe(false);
		expect(localStorage.getItem(STORAGE.hasData)).toBeNull();
		expect(localStorage.getItem(STORAGE.endedAt)).toBeNull();
	});

	it('deletes the archive on disable, on logout, and when switched on again', async () => {
		const { installDebugRecorder, runBeforeLogout, STORAGE } = await load();
		const archive = () => {
			localStorage.setItem(STORAGE.hasData, '1');
			localStorage.setItem(STORAGE.endedAt, String(Date.now() - MINUTE));
		};
		archive();
		const api = installDebugRecorder({
			app: 'admin',
		});
		expect(api.archived).toBe(true);

		await api.disable();
		expect(api.archived).toBe(false);
		expect(localStorage.getItem(STORAGE.endedAt)).toBeNull();

		archive();
		await runBeforeLogout();
		expect(api.archived).toBe(false);

		archive();
		await api.enable();
		expect(api.recording).toBe(true);
		expect(api.archived).toBe(false);
		// a fresh start: the old archive's flags are gone (its database is deleted, which the mock store does not model)
		expect(localStorage.getItem(STORAGE.endedAt)).toBeNull();
	});

	it('keeps the records when another tab ends the recording, drops them when it deletes them', async () => {
		const { installDebugRecorder, setEnabled, STORAGE } = await load();
		setEnabled(true);
		const api = installDebugRecorder({
			app: 'workspace',
		});
		expect(api.recording).toBe(true);

		// the other tab's finishRecording(): `has-data` stays
		localStorage.removeItem(STORAGE.enabled);
		window.dispatchEvent(
			new StorageEvent('storage', {
				key: STORAGE.enabled,
				newValue: null,
			}),
		);
		await vi.waitFor(() => expect(api.recording).toBe(false));
		expect(records.length).toBeGreaterThan(0);
		expect(api.archived).toBe(true);

		// the other tab's wipe
		localStorage.removeItem(STORAGE.hasData);
		window.dispatchEvent(
			new StorageEvent('storage', {
				key: STORAGE.hasData,
				newValue: null,
			}),
		);
		await vi.waitFor(() => expect(api.archived).toBe(false));
	});
});
