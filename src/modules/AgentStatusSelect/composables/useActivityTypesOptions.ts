import { OnlineSkillsAPI } from '@webitel/api-services/api';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { LookupOption } from '../../../types';

export const useActivityTypesOptions = () => {
	const { t } = useI18n();

	const activityTypes = ref<LookupOption[]>([]);
	const defaultActivityTypeOption = ref<LookupOption | null>(null);

	async function loadActivityTypes(): Promise<void> {
		const response = await OnlineSkillsAPI.getList({
			skipDefault: false,
		});
		if (!response?.items?.length) {
			defaultActivityTypeOption.value = null;
			activityTypes.value = [];
			return;
		}
		defaultActivityTypeOption.value = response.items[0];
		activityTypes.value = [
			{
				id: response.items[0].id,
				name: t('webitelUI.agentStatusSelect.activityTypePopup.defaultOption'),
			},
			...response.items.slice(1),
		];
	}

	return {
		activityTypes,
		defaultActivityTypeOption,
		loadActivityTypes,
	};
};
