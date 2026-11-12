import { type ComputedRef, ref } from 'vue';

import { useProgressAction } from '../useProgressAction/useProgressAction';

// [Claude] https://webitel.atlassian.net/browse/WTEL-10817

export interface ImportJob {
	/** [Claude] number of records; when known, a "loaded/total" toast is shown while the import runs */
	total?: number;
	run: (onProgress: (loaded: number) => void) => Promise<unknown>;
}

export interface RunImportOptions {
	/** [Claude] separates parallel imports on one page, e.g. a table row id */
	key?: unknown;
}

export type ImportRunner = (
	job: ImportJob,
	options?: RunImportOptions,
) => Promise<unknown>;

export interface UseImportActionReturn {
	isImporting: ComputedRef<boolean>;
	isKeyImporting: (key: unknown) => boolean;
	runImport: ImportRunner;
}

/**
 * [Claude] Loader state + progress/success/error toasts around an import – a preset of useProgressAction.
 * Errors are reported with a toast and swallowed, so callers don't need to catch.
 */
export const useImportAction = (): UseImportActionReturn => {
	const {
		isLoading: isImporting,
		isKeyLoading: isKeyImporting,
		run: runAction,
	} = useProgressAction({
		// [Claude] no "count only" text: imports always know their total when they show progress
		messages: {
			inProgress: 'systemNotifications.import.inProgress',
			success: 'systemNotifications.import.success',
			error: 'errorNotifications.downloadFailed',
		},
	});

	const runImport: ImportRunner = ({ total, run }, { key } = {}) => {
		const loaded = ref(0);
		return runAction(
			() =>
				run((value) => {
					loaded.value = value;
				}),
			{
				key,
				progress:
					total == null
						? undefined
						: {
								loaded,
								total,
							},
			},
		);
	};

	return {
		isImporting,
		isKeyImporting,
		runImport,
	};
};
