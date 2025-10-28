import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getUserTimezone } from '../api/UserinfoAPI';

interface Timezone {
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
        try {
          timezone.value = JSON.parse(storedTimezone);
        } catch {
          // If parsing fails, fetch from API
          const userTimezone = await getUserTimezone();
          const { id, offset } = userTimezone;
          timezone.value = { id, offset };
          localStorage.setItem('timezone', JSON.stringify({ id, offset }));
        }
      } else {
        const userTimezone = await getUserTimezone();
        const { id, offset } = userTimezone;
        timezone.value = { id, offset };
        localStorage.setItem('timezone', JSON.stringify({ id, offset }));
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
