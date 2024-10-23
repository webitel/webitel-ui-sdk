import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useTableEmpty = (emptyState) => {
  const { t } = useI18n();

  const media = computed(() => {});
  const headline = computed(() => {});
  const title = computed(() => {});
  const text = computed(() => {});
  const actionText = computed(() => {});

  return {
    media,
    headline,
    title,
    text,
    actionText,
  };
};
