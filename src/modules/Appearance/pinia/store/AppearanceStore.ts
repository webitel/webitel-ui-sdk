import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const createAppearanceStore = () => {
  const namespace = 'appearance';

  const store = defineStore(namespace, () => {
    const theme = ref<null | string>(null);

    const darkMode = computed(() => theme.value === 'dark')

    const setTheme = (newTheme: string) => {
      theme.value = newTheme
    }

    return {
      theme,
      darkMode,

      setTheme
    };
  });

  return store;
};
