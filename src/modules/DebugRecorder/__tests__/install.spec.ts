import { describe, expect, it } from 'vitest';
import { installDebugRecorder } from '../install';

describe('installDebugRecorder', () => {
	it('removes the storage left by the Workspace spike, records nothing while off', () => {
		localStorage.setItem('wt-debug-recorder', String(Date.now() + 60_000));
		localStorage.setItem('wt-debug-recorder:has-data', '1');
		localStorage.setItem('wt-debug-recorder:clean-exit', 'sid');

		const api = installDebugRecorder({
			app: 'test',
		});

		expect(api.recording).toBe(false);
		expect(window.webitelDebug).toBe(api);
		expect(
			Object.keys(localStorage).filter((k) => k.startsWith('wt-debug')),
		).toEqual([]);
	});
});
