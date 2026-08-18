import type { Ref } from 'vue';

// primevue's galleria doesn't support hiding on mask click so there is a custom solution
export const useGalleriaMaskClick = (visible: Ref<boolean>) => {
	const onMaskClick = ({ target }: Event) => {
		if ((target as HTMLElement)?.classList.contains('p-galleria-mask')) {
			visible.value = false;
		}
	};

	const listenMaskElementClick = () => {
		document
			.querySelector('.p-galleria-mask')
			?.addEventListener('click', onMaskClick);
	};

	const removeMaskElementClick = () => {
		document
			.querySelector('.p-galleria-mask')
			?.removeEventListener('click', onMaskClick);
	};

	return {
		listenMaskElementClick,
		removeMaskElementClick,
	};
};
