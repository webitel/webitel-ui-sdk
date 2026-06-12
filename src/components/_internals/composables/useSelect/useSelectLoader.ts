import { type Ref, ref, watch } from 'vue';

export const useSelectLoader = (isLoading: Ref<boolean>) => {
	const showFooterLoader = ref(false);
	let loaderTimer: ReturnType<typeof setTimeout> | null = null;

	watch(isLoading, (val) => {
		if (val) {
			if (loaderTimer) clearTimeout(loaderTimer);
			showFooterLoader.value = true;
		} else {
			loaderTimer = setTimeout(() => {
				showFooterLoader.value = false;
			}, 500);
		}
	});

	return {
		showFooterLoader,
	};
};
