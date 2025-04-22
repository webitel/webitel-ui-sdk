import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useFromToSecToPreviewTime = (value: {
  from?: number | string | null;
  to?: number | string | null;
}) => {
  const { t } = useI18n();

  const format = (secsVal: number) => {
    const minutes = Math.floor(secsVal / 60);
    const seconds = secsVal % 60;

    return `${t('webitelUI.timepicker.min')} ${minutes} ${t('webitelUI.timepicker.sec')} ${seconds}`;
  };

  const from = computed(() => {
    const numValue = Number(value.from);

    if (!numValue && numValue !== 0) {
      return '';
    }

    return format(numValue);
  });

  const to = computed(() => {
    const numValue = Number(value.to);

    if (!numValue && numValue !== 0) {
      return '';
    }

    return format(numValue);
  });

  return {
    from,
    to,
  };
};
