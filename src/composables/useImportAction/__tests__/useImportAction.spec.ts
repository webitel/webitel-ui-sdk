import { beforeEach, describe, expect, it, vi } from 'vitest';
import eventBus from '../../../scripts/eventBus';
import { useImportAction } from '../useImportAction';

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

describe('useImportAction', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('shows loaded/total while importing and the import success toast after', async () => {
		const { isImporting, runImport } = useImportAction();
		let report: (loaded: number) => void = () => {};
		let finish: () => void = () => {};

		const job = runImport({
			total: 130,
			run: (onProgress) => {
				report = onProgress;
				return new Promise<void>((resolve) => {
					finish = resolve;
				});
			},
		});

		expect(isImporting.value).toBe(true);
		const [[message]] = toast.add.mock.calls;
		expect(message.detail).toBe(
			'systemNotifications.import.inProgress {"loaded":0,"total":130}',
		);

		report(100);
		expect(message.detail).toContain('"loaded":100');

		finish();
		await job;

		expect(isImporting.value).toBe(false);
		expect(toast.remove).toHaveBeenCalledWith(message);
		expect(eventBus.$emit).toHaveBeenCalledWith('notification', {
			type: 'success',
			text: 'systemNotifications.import.success',
		});
	});

	it('skips the progress toast when the total is unknown', async () => {
		const { runImport } = useImportAction();

		await runImport({
			run: () => Promise.resolve(),
		});

		expect(toast.add).not.toHaveBeenCalled();
		expect(eventBus.$emit).toHaveBeenCalledWith('notification', {
			type: 'success',
			text: 'systemNotifications.import.success',
		});
	});

	it('tracks imports per key', () => {
		const { isKeyImporting, runImport } = useImportAction();

		runImport(
			{
				run: () => new Promise(() => {}),
			},
			{
				key: 'row-1',
			},
		);

		expect(isKeyImporting('row-1')).toBe(true);
		expect(isKeyImporting('row-2')).toBe(false);
	});
});
