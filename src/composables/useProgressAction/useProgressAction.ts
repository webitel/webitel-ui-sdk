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

// [Claude] generic core of useDownloadAction / useImportAction – an action type is a preset of messages over it
// https://webitel.atlassian.net/browse/WTEL-10817

/** [Claude] locale keys of the action's toasts */
export interface ProgressActionMessages {
	/** [Claude] gets `loaded` and `total` */
	inProgress: string;
	/** [Claude] gets `count`; used when the total is unknown, falls back to `inProgress` if not set */
	inProgressCount?: string;
	success: string;
	error: string;
}

export interface ActionProgress {
	loaded: MaybeRefOrGetter<number>;
	/** [Claude] leave empty when the total is unknown – only the loaded count is shown then */
	total?: MaybeRefOrGetter<number | undefined>;
}

export interface RunProgressActionOptions {
	/** [Claude] separates parallel actions on one page, e.g. a table row id */
	key?: unknown;
	/** [Claude] shows a sticky "in progress" toast with the counter while the action runs */
	progress?: ActionProgress;
}

export type RunProgressAction = <T>(
	action: () => Promise<T>,
	options?: RunProgressActionOptions,
) => Promise<T | undefined>;

export interface UseProgressActionReturn {
	isLoading: ComputedRef<boolean>;
	isKeyLoading: (key: unknown) => boolean;
	run: RunProgressAction;
}

const DEFAULT_KEY = Symbol('progress-action');

/**
 * [Claude] Loader state + progress/success/error toasts around an async action.
 * Errors are reported with a toast and swallowed, so template handlers can call it without `await`.
 */
export const useProgressAction = ({
	messages,
}: {
	messages: ProgressActionMessages;
}): UseProgressActionReturn => {
	const { t } = useI18n();
	const toast = useToast();
	const eventBus = useEventBus() ?? defaultEventBus;

	const loadingKeys = reactive(new Set<unknown>());

	const isLoading = computed(() => loadingKeys.size > 0);
	const isKeyLoading = (key: unknown) => loadingKeys.has(key);

	const showProgressToast = ({ loaded, total }: ActionProgress) => {
		// [Claude] sources may reset their counters before the action settles – don't let the closing toast drop to 0
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
				return totalValue == null && messages.inProgressCount
					? t(messages.inProgressCount, {
							count: loadedCount.value,
						})
					: t(messages.inProgress, {
							loaded: loadedCount.value,
							total: totalValue,
						});
			}),
		});
		toast.add(message);
		return () => toast.remove(message);
	};

	const run: RunProgressAction = async (
		action,
		{ key = DEFAULT_KEY, progress } = {},
	) => {
		if (loadingKeys.has(key)) return undefined;

		loadingKeys.add(key);
		const closeProgressToast = progress ? showProgressToast(progress) : null;
		try {
			const result = await action();
			eventBus.$emit('notification', {
				type: 'success',
				text: t(messages.success),
			});
			return result;
		} catch {
			eventBus.$emit('notification', {
				type: 'error',
				text: t(messages.error),
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
		run,
	};
};
