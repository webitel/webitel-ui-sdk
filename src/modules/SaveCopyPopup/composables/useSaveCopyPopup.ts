import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useSaveCopyPopup = (onSave: (name: string) => unknown) => {
	const { t } = useI18n();

	const isSaveCopyPopupShown = ref(false);

	function openSaveCopyPopup() {
		isSaveCopyPopupShown.value = true;
	}

	function closeSaveCopyPopup() {
		isSaveCopyPopupShown.value = false;
	}

	async function saveCopy(name: string) {
		await onSave(name);
		closeSaveCopyPopup();
	}

	const saveOptions = [
		{
			text: t('webitelUI.saveCopyPopup.title'),
			callback: openSaveCopyPopup,
		},
	];

	return {
		isSaveCopyPopupShown,
		saveOptions,

		openSaveCopyPopup,
		closeSaveCopyPopup,
		saveCopy,
	};
};
