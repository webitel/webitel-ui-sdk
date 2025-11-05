import { QueuePeriodOptions } from '../enums/options/QueuePeriodOptions';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useQueuePeriodOptions() {
  const { t } = useI18n();

  const mapPeriodToLabel = (value: string) => {
    switch (value) {
      case 'today':
        return t('filters.period.options.today');
      case '6hour':
        return t('filters.period.options.h', { h: 6 }, 2);
      case '3hour':
        return t('filters.period.options.h', { h: 3 }, 2);
      case '1hour':
        return t('filters.period.options.h', { h: 1 }, 1);
      case '30min':
        return t('filters.period.options.m', { m: 30 }, 2);
      case '15min':
        return t('filters.period.options.m', { m: 15 }, 2);
      default:
        return value;
    }
  };

  const options = computed(() =>
    QueuePeriodOptions.map(({ value }) => ({
      value,
      label: mapPeriodToLabel(value),
    }))
  );

  return {
    options,
  };
}
