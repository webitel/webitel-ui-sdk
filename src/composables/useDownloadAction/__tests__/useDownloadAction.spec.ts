import { beforeEach, describe, expect, it, vi } from 'vitest';
import eventBus from '../../../scripts/eventBus';
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
vi.mock('../../../scripts/eventBus', () => ({
	default: {
		$emit: vi.fn(),
	},
}));

// [Claude] behaviour is covered by useProgressAction.spec – here only the download preset (texts, API)
describe('useDownloadAction', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('uses download success and error texts', async () => {
		const { isLoading, runDownload } = useDownloadAction();

		await runDownload(() => Promise.resolve());
		await runDownload(() => Promise.reject(new Error('fail')));

		expect(isLoading.value).toBe(false);
		expect(eventBus.$emit).toHaveBeenCalledWith('notification', {
			type: 'success',
			text: 'systemNotifications.download.success',
		});
		expect(eventBus.$emit).toHaveBeenCalledWith('notification', {
			type: 'error',
			text: 'errorNotifications.downloadFailed',
		});
	});

	it('uses download progress texts with and without a total', () => {
		const { runDownload } = useDownloadAction();

		runDownload(() => new Promise(() => {}), {
			key: 'count',
			progress: {
				loaded: 12,
			},
		});
		runDownload(() => new Promise(() => {}), {
			key: 'total',
			progress: {
				loaded: 12,
				total: 130,
			},
		});

		const [[countMessage], [totalMessage]] = toast.add.mock.calls;
		expect(countMessage.detail).toBe(
			'systemNotifications.download.inProgressCount {"count":12}',
		);
		expect(totalMessage.detail).toBe(
			'systemNotifications.download.inProgress {"loaded":12,"total":130}',
		);
	});
});
