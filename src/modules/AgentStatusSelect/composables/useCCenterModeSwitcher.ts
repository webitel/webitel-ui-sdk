import { ref } from 'vue';

import type { UseCCenterModeSwitcherParams } from '../types/UseCCenterModeSwitcherParams.types';

export const useCCenterModeSwitcher = ({
	activityTypes,
	loadActivityTypes,
	openActivityTypePopup,
	emit,
}: UseCCenterModeSwitcherParams) => {
	const callCenterModeChanging = ref(false);

	function changedCallCenterModeHandler() {
		emit('changed-call-center-mode');
		callCenterModeChanging.value = false;
	}

	async function toggleCallCenterMode(value: boolean) {
		callCenterModeChanging.value = true;
		if (value) {
			if (activityTypes.value.length <= 1) {
				try {
					await loadActivityTypes();
				} catch (err) {
					callCenterModeChanging.value = false;
					throw err;
				}
			}
			if (activityTypes.value.length > 1) {
				openActivityTypePopup();
			} else {
				changedCallCenterModeHandler();
			}
		} else {
			changedCallCenterModeHandler();
		}
	}

	return {
		callCenterModeChanging,
		toggleCallCenterMode,
	};
};
