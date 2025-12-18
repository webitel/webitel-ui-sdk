import { Ref, ref } from "vue";

interface UseDropzoneHandlers {
	isDropzoneVisible: Ref<boolean>;
	handleDragEnter: () => void;
	handleDragLeave: () => void;
}

export const useDropzoneHandlers = (): UseDropzoneHandlers => {
	const isDropzoneVisible = ref<boolean>(false);

	const handleDragEnter = (): void => {
		isDropzoneVisible.value = true;
	};

	const handleDragLeave = (): void => {
		isDropzoneVisible.value = false;
	};

	return {
		isDropzoneVisible,
		handleDragEnter,
		handleDragLeave,
	};
};
