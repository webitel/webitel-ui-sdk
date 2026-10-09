import { useI18n } from 'vue-i18n';

import { useEventBus } from '../../../composables';
import { eventBus as defaultEventBus } from '../../../scripts';

export const useSaveCopy = (onSave: () => unknown) => {
	const { t } = useI18n();
	const eventBus = useEventBus() ?? defaultEventBus;

	async function saveCopy() {
		await onSave();
		eventBus.$emit('notification', {
			type: 'success',
			text: t('webitelUI.saveCopy.successNotification'),
		});
	}

	const saveOptions = [
		{
			text: t('webitelUI.saveCopy.title'),
			callback: saveCopy,
		},
	];

	return {
		saveOptions,
		saveCopy,
	};
};
