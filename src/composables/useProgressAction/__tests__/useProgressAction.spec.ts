import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import eventBus from '../../../scripts/eventBus';
import { useProgressAction } from '../useProgressAction';

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
vi.mock('../../../scripts/eventBus', () => ({
	default: {
		$emit: vi.fn(),
	},
}));

const messages = {
	inProgress: 'test.inProgress',
	inProgressCount: 'test.inProgressCount',
	success: 'test.success',
	error: 'test.error',
};

const deferred = () => {
	let resolve!: () => void;
	const promise = new Promise<void>((res) => {
		resolve = res;
	});
	return {
		promise,
		resolve,
	};
};

describe('useProgressAction', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('shows loader while running and success toast after', async () => {
		const { isLoading, run } = useProgressAction({
			messages,
		});
		const { promise, resolve } = deferred();

		const job = run(() => promise);
		expect(isLoading.value).toBe(true);

		resolve();
		await job;

		expect(isLoading.value).toBe(false);
		expect(eventBus.$emit).toHaveBeenCalledWith('notification', {
			type: 'success',
			text: 'test.success',
		});
	});

	it('shows error toast and does not throw on failure', async () => {
		const { isLoading, run } = useProgressAction({
			messages,
		});

		await expect(
			run(() => Promise.reject(new Error('fail'))),
		).resolves.toBeUndefined();

		expect(isLoading.value).toBe(false);
		expect(eventBus.$emit).toHaveBeenCalledWith('notification', {
			type: 'error',
			text: 'test.error',
		});
	});

	it('tracks loading per key and ignores repeated runs of the same key', async () => {
		const { isKeyLoading, run } = useProgressAction({
			messages,
		});
		const { promise, resolve } = deferred();
		const action = vi.fn(() => promise);

		const job = run(action, {
			key: 1,
		});
		run(action, {
			key: 1,
		});

		expect(isKeyLoading(1)).toBe(true);
		expect(isKeyLoading(2)).toBe(false);
		expect(action).toHaveBeenCalledTimes(1);

		resolve();
		await job;
		expect(isKeyLoading(1)).toBe(false);
	});

	it('keeps progress toast counter live and closes it when done', async () => {
		const { run } = useProgressAction({
			messages,
		});
		const { promise, resolve } = deferred();
		const loaded = ref(0);

		const job = run(() => promise, {
			progress: {
				loaded,
			},
		});

		const [[message]] = toast.add.mock.calls;
		expect(message.life).toBe(0);
		expect(message.detail).toBe('test.inProgressCount {"count":0}');

		loaded.value = 12;
		expect(message.detail).toBe('test.inProgressCount {"count":12}');

		resolve();
		await job;
		expect(toast.remove).toHaveBeenCalledWith(message);
	});

	it('does not drop the counter when the source resets before finishing', () => {
		const { run } = useProgressAction({
			messages,
		});
		const loaded = ref(0);

		run(() => new Promise(() => {}), {
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
		const { run } = useProgressAction({
			messages,
		});

		run(() => new Promise(() => {}), {
			progress: {
				loaded: 12,
				total: 130,
			},
		});

		const [[message]] = toast.add.mock.calls;
		expect(message.detail).toBe('test.inProgress {"loaded":12,"total":130}');
	});

	it('falls back to inProgress when there is no count-only text', () => {
		const { run } = useProgressAction({
			messages: {
				...messages,
				inProgressCount: undefined,
			},
		});

		run(() => new Promise(() => {}), {
			progress: {
				loaded: 3,
			},
		});

		const [[message]] = toast.add.mock.calls;
		expect(message.detail).toBe('test.inProgress {"loaded":3}');
	});
});
