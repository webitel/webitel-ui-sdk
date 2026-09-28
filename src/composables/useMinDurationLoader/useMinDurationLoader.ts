import { type Ref, ref } from 'vue';

export interface UseMinDurationLoaderReturn {
	isLoading: Ref<boolean>;
	runWithMinDuration: <T>(action: () => Promise<T>) => Promise<T>;
}

export const useMinDurationLoader = (
	minDurationMs = 500,
): UseMinDurationLoaderReturn => {
	const isLoading = ref(false);

	const runWithMinDuration = async <T>(
		action: () => Promise<T>,
	): Promise<T> => {
		isLoading.value = true;
		try {
			return await action();
		} finally {
			setTimeout(() => {
				isLoading.value = false;
			}, minDurationMs);
		}
	};

	return {
		isLoading,
		runWithMinDuration,
	};
};
