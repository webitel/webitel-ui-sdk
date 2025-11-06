import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useQueuePeriodOptions() {
  const { t } = useI18n();

  const QueuePeriodOptions = {
    today: 'today',
    h6: '6hour',
    h3: '3hour',
    h1: '1hour',
    m30: '30min',
    m15: '15min',
  }

  const mapPeriodToLabel = (value: string) => {
    switch (value) {
      case QueuePeriodOptions.today:
        return t('filters.period.options.today');
      case QueuePeriodOptions.h6:
        return t('filters.period.options.h', { h: 6 }, 2);
      case QueuePeriodOptions.h3:
        return t('filters.period.options.h', { h: 3 }, 2);
      case QueuePeriodOptions.h1:
        return t('filters.period.options.h', { h: 1 }, 1);
      case QueuePeriodOptions.m30:
        return t('filters.period.options.m', { m: 30 }, 2);
      case QueuePeriodOptions.m15:
        return t('filters.period.options.m', { m: 15 }, 2);
      default:
        return value;
    }
  };

  const options = computed(() =>
    Object.values(QueuePeriodOptions).map((value) => ({
      value,
      label: mapPeriodToLabel(value),
    }))
  );

  return {
    options,
  };
}
