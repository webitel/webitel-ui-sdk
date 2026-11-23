import { beforeEach, describe, expect, it, vi } from 'vitest';

async function load() {
	vi.resetModules();
	return import('../sessionHooks');
}

describe('sessionHooks', () => {
	beforeEach(() => {
		delete (globalThis as Record<symbol, unknown>)[
			Symbol.for('webitel.ui-sdk.session-hooks')
		];
	});

	it('awaits before-logout hooks, survives a failing one, never waits past the timeout', async () => {
		vi.useFakeTimers();
		try {
			const { onBeforeLogout, runBeforeLogout } = await load();
			const done: string[] = [];
			onBeforeLogout(async () => {
				done.push('fast');
			});
			onBeforeLogout(() => {
				throw new Error('boom');
			});
			onBeforeLogout(() => new Promise(() => {}));
			vi.spyOn(console, 'error').mockImplementation(() => {});

			let finished = false;
			void runBeforeLogout(3_000).then(() => {
				finished = true;
			});
			await vi.advanceTimersByTimeAsync(2_999);
			expect(done).toEqual([
				'fast',
			]);
			expect(finished).toBe(false);
			await vi.advanceTimersByTimeAsync(1);
			expect(finished).toBe(true);
		} finally {
			vi.useRealTimers();
		}
	});

	it('tells late subscribers about the signed-in user right away', async () => {
		const { notifySessionUser, onSessionUser } = await load();
		notifySessionUser(7);
		const seen: string[] = [];
		onSessionUser((id) => {
			seen.push(id);
		});
		await Promise.resolve();
		expect(seen).toEqual([
			'7',
		]);
	});

	it('shares one registry between two copies of the module', async () => {
		const first = await load();
		const hook = vi.fn();
		first.onBeforeLogout(hook);

		const second = await load();
		expect(second).not.toBe(first);
		await second.runBeforeLogout();
		expect(hook).toHaveBeenCalledOnce();
	});
});
