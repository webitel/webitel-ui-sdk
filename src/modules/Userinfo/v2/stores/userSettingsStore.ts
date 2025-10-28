import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getUserTimezone } from '../api/UserinfoAPI';

interface Timezone {
  name: string;
  id: string;
  offset: string;
}

export const createUserSettingsStore = () => {
  const namespace = 'user-settings';

  return defineStore(namespace, () => {
    const timezone = ref<Timezone | null>(null);

    const initializeTimezone = async () => {
      const storedTimezone = localStorage.getItem('timezone');
      if (storedTimezone) {
        timezone.value = JSON.parse(storedTimezone);
      } else {
        const userTimezone = await getUserTimezone();
        timezone.value = userTimezone;
        localStorage.setItem('timezone', JSON.stringify(userTimezone));
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
