import { useToast } from 'primevue/usetoast';
import {
	type ComputedRef,
	computed,
	type MaybeRefOrGetter,
	reactive,
	toValue,
} from 'vue';
import { useI18n } from 'vue-i18n';

import defaultEventBus from '../../scripts/eventBus';
import { useEventBus } from '../useEventBus/useEventBus';

// [Claude] https://webitel.atlassian.net/browse/WTEL-10819

export interface DownloadProgress {
	loaded: MaybeRefOrGetter<number>;
	/** [Claude] leave empty when the backend doesn't report a total – only the loaded count is shown then */
	total?: MaybeRefOrGetter<number | undefined>;
}

export interface RunDownloadOptions {
	/** [Claude] separates parallel downloads on one page, e.g. a table row id */
	key?: unknown;
	/** [Claude] shows a sticky "in progress" toast with the counter while the download runs */
	progress?: DownloadProgress;
}

export interface UseDownloadActionReturn {
	isLoading: ComputedRef<boolean>;
	isKeyLoading: (key: unknown) => boolean;
	runDownload: <T>(
		action: () => Promise<T>,
		options?: RunDownloadOptions,
	) => Promise<T | undefined>;
}

const DEFAULT_KEY = Symbol('download');

/**
 * [Claude] Loader state + success/error toasts around a download.
 * Errors are reported with a toast and swallowed, so template handlers can call it without `await`.
 */
export const useDownloadAction = (): UseDownloadActionReturn => {
	const { t } = useI18n();
	const toast = useToast();
	const eventBus = useEventBus() ?? defaultEventBus;

	const loadingKeys = reactive(new Set<unknown>());

	const isLoading = computed(() => loadingKeys.size > 0);
	const isKeyLoading = (key: unknown) => loadingKeys.has(key);

	const showProgressToast = ({ loaded, total }: DownloadProgress) => {
		// [Claude] exporters reset their counters before the download settles – don't let the closing toast drop to 0
		let maxLoaded = 0;
		const loadedCount = computed(() => {
			maxLoaded = Math.max(maxLoaded, toValue(loaded));
			return maxLoaded;
		});

		// [Claude] PrimeVue keeps the passed object, so a reactive one keeps the counter live; life: 0 – no auto-close
		const message = reactive({
			severity: 'info',
			life: 0,
			detail: computed(() => {
				const totalValue = toValue(total);
				return totalValue == null
					? t('systemNotifications.download.inProgressCount', {
							count: loadedCount.value,
						})
					: t('systemNotifications.download.inProgress', {
							loaded: loadedCount.value,
							total: totalValue,
						});
			}),
		});
		toast.add(message);
		return () => toast.remove(message);
	};

	const runDownload = async <T>(
		action: () => Promise<T>,
		{ key = DEFAULT_KEY, progress }: RunDownloadOptions = {},
	): Promise<T | undefined> => {
		if (loadingKeys.has(key)) return undefined;

		loadingKeys.add(key);
		const closeProgressToast = progress ? showProgressToast(progress) : null;
		try {
			const result = await action();
			eventBus.$emit('notification', {
				type: 'success',
				text: t('systemNotifications.download.success'),
			});
			return result;
		} catch {
			eventBus.$emit('notification', {
				type: 'error',
				text: t('errorNotifications.downloadFailed'),
			});
			return undefined;
		} finally {
			closeProgressToast?.();
			loadingKeys.delete(key);
		}
	};

	return {
		isLoading,
		isKeyLoading,
		runDownload,
	};
};
