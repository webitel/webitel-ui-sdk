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

/** [Claude] resolves to whether the import succeeded, e.g. to reload a list only after a successful one (WTEL-11052) */
export type ImportRunner = (
	job: ImportJob,
	options?: RunImportOptions,
) => Promise<boolean>;

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
			error: 'errorNotifications.importFailed',
		},
	});

	const runImport: ImportRunner = async ({ total, run }, { key } = {}) => {
		const loaded = ref(0);
		// [Claude] runAction swallows errors and resolves undefined, so success is marked explicitly
		const succeeded = await runAction(
			async () => {
				await run((value) => {
					loaded.value = value;
				});
				return true;
			},
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
		return succeeded === true;
	};

	return {
		isImporting,
		isKeyImporting,
		runImport,
	};
};
