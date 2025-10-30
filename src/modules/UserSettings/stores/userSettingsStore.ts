import { defineStore } from 'pinia';
import { ref } from 'vue';

import UserSettingsAPI from '../api/UserSettingsAPI';
import { TIMEZONE_STORAGE_KEY } from '../constants/UserSettingsConstants';

export const createUserSettingsStore = () => {
  const namespace = 'user-settings';

  return defineStore(namespace, () => {
    const timezone = ref<string | null>(null);

    const initializeTimezone = async () => {
      const storedTimezone = localStorage.getItem(TIMEZONE_STORAGE_KEY);
      if (storedTimezone) {
        timezone.value = storedTimezone;
      } else {
        const userTimezone = await UserSettingsAPI.getUserTimezone();
        timezone.value = userTimezone.name;
        localStorage.setItem(
          TIMEZONE_STORAGE_KEY,
          JSON.stringify(userTimezone),
        );
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
