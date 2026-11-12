import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import eventBus from '../../../scripts/eventBus.js';
import { useDownloadAction } from '../useDownloadAction';

const toast = {
	add: vi.fn(),
	remove: vi.fn(),
};

vi.mock('primevue/usetoast', () => ({
	useToast: () => toast,
}));
vi.mock('vue-i18n', () => ({
	useI18n: () => ({
		t: (key: string, params?: Record<string, unknown>) =>
			params ? `${key} ${JSON.stringify(params)}` : key,
	}),
}));
vi.mock('../../useEventBus/useEventBus', () => ({
	useEventBus: () => undefined,
}));
vi.mock('../../../scripts/eventBus.js', () => ({
	default: {
		$emit: vi.fn(),
	},
}));

const deferred = () => {
	let resolve!: () => void;
	let reject!: (err: unknown) => void;
	const promise = new Promise<void>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return {
		promise,
		resolve,
		reject,
	};
};

describe('useDownloadAction', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('shows loader while running and success toast after', async () => {
		const { isLoading, runDownload } = useDownloadAction();
		const { promise, resolve } = deferred();

		const run = runDownload(() => promise);
		expect(isLoading.value).toBe(true);

		resolve();
		await run;

		expect(isLoading.value).toBe(false);
		expect(eventBus.$emit).toHaveBeenCalledWith('notification', {
			type: 'success',
			text: 'systemNotifications.download.success',
		});
	});

	it('replaces success toast with the one from getNotification', async () => {
		const { runDownload } = useDownloadAction();
		const warning = {
			type: 'warning' as const,
			text: 'skipped',
		};

		await runDownload(() => Promise.resolve(3), {
			getNotification: (result) => (result ? warning : undefined),
		});
		expect(eventBus.$emit).toHaveBeenLastCalledWith('notification', warning);

		await runDownload(() => Promise.resolve(0), {
			getNotification: (result) => (result ? warning : undefined),
		});
		expect(eventBus.$emit).toHaveBeenLastCalledWith('notification', {
			type: 'success',
			text: 'systemNotifications.download.success',
		});
	});

	it('shows error toast and does not throw on failure', async () => {
		const { isLoading, runDownload } = useDownloadAction();

		await expect(
			runDownload(() => Promise.reject(new Error('fail'))),
		).resolves.toBeUndefined();

		expect(isLoading.value).toBe(false);
		expect(eventBus.$emit).toHaveBeenCalledWith('notification', {
			type: 'error',
			text: 'errorNotifications.downloadFailed',
		});
	});

	it('tracks loading per key and ignores repeated runs of the same key', async () => {
		const { isKeyLoading, runDownload } = useDownloadAction();
		const { promise, resolve } = deferred();
		const action = vi.fn(() => promise);

		const run = runDownload(action, {
			key: 1,
		});
		runDownload(action, {
			key: 1,
		});

		expect(isKeyLoading(1)).toBe(true);
		expect(isKeyLoading(2)).toBe(false);
		expect(action).toHaveBeenCalledTimes(1);

		resolve();
		await run;
		expect(isKeyLoading(1)).toBe(false);
	});

	it('keeps progress toast counter live and closes it when done', async () => {
		const { runDownload } = useDownloadAction();
		const { promise, resolve } = deferred();
		const loaded = ref(0);

		const run = runDownload(() => promise, {
			progress: {
				loaded,
			},
		});

		const [[message]] = toast.add.mock.calls;
		expect(message.life).toBe(0);
		expect(message.detail).toBe(
			'systemNotifications.download.inProgressCount {"count":0}',
		);

		loaded.value = 12;
		expect(message.detail).toBe(
			'systemNotifications.download.inProgressCount {"count":12}',
		);

		resolve();
		await run;
		expect(toast.remove).toHaveBeenCalledWith(message);
	});

	it('does not drop the counter when the source resets before finishing', () => {
		const { runDownload } = useDownloadAction();
		const loaded = ref(0);

		runDownload(() => new Promise(() => {}), {
			progress: {
				loaded,
			},
		});

		const [[message]] = toast.add.mock.calls;
		loaded.value = 12;
		expect(message.detail).toContain('"count":12');

		loaded.value = 0;
		expect(message.detail).toContain('"count":12');
	});

	it('shows loaded/total when total is known', () => {
		const { runDownload } = useDownloadAction();

		runDownload(() => new Promise(() => {}), {
			progress: {
				loaded: 12,
				total: 130,
			},
		});

		const [[message]] = toast.add.mock.calls;
		expect(message.detail).toBe(
			'systemNotifications.download.inProgress {"loaded":12,"total":130}',
		);
	});
});
