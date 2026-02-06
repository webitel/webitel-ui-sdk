import { defineStore } from 'pinia';
import { ref } from 'vue';

import UserSettingsAPI from '../api/UserSettingsAPI';
import { TIMEZONE_STORAGE_KEY } from '../constants/UserSettingsConstants';

export const createSettingsStore = ({ namespace = 'userinfo' } = {}) => {
	return defineStore(`${namespace}/settings`, () => {
		const timezone = ref<string | null>(null);

		const initializeTimezone = async () => {
			const storedTimezone = localStorage.getItem(TIMEZONE_STORAGE_KEY);
			if (storedTimezone) {
				timezone.value = storedTimezone;
			}

			try {
				const { timezone: userTimezone } =
					await UserSettingsAPI.getUserTimezone();
				if (userTimezone && userTimezone !== timezone.value) {
					timezone.value = userTimezone;
					localStorage.setItem(TIMEZONE_STORAGE_KEY, userTimezone);
				}
			} catch {
				if (!timezone.value) {
					const systemTimezone =
						Intl.DateTimeFormat().resolvedOptions().timeZone;
					timezone.value = systemTimezone;
					localStorage.setItem(TIMEZONE_STORAGE_KEY, systemTimezone);
				}
			}
		};

		const initialize = async () => {
			await initializeTimezone();
		};

		return {
			timezone,

			initialize,
		};
	});
};
