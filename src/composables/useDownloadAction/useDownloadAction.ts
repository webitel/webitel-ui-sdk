import type { ComputedRef } from 'vue';

import {
	type ActionProgress,
	type RunProgressAction,
	type RunProgressActionOptions,
	useProgressAction,
} from '../useProgressAction/useProgressAction';

// [Claude] https://webitel.atlassian.net/browse/WTEL-10819

export type DownloadProgress = ActionProgress;

export type RunDownloadOptions = RunProgressActionOptions;

export interface UseDownloadActionReturn {
	isLoading: ComputedRef<boolean>;
	isKeyLoading: (key: unknown) => boolean;
	runDownload: RunProgressAction;
}

/**
 * [Claude] Loader state + progress/success/error toasts around a download – a preset of useProgressAction.
 * Errors are reported with a toast and swallowed, so template handlers can call it without `await`.
 */
export const useDownloadAction = (): UseDownloadActionReturn => {
	const { isLoading, isKeyLoading, run } = useProgressAction({
		messages: {
			inProgress: 'systemNotifications.download.inProgress',
			inProgressCount: 'systemNotifications.download.inProgressCount',
			success: 'systemNotifications.download.success',
			error: 'errorNotifications.downloadFailed',
		},
	});

	return {
		isLoading,
		isKeyLoading,
		runDownload: run,
	};
};
