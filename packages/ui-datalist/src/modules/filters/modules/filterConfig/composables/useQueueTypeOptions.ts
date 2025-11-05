import { QueueType } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useQueueTypeOptions() {
  const { t } = useI18n();

  const mapQueueTypeToLabel = (value: string) =>
    t(`objects.queue.type.${value}`);

  const options = computed(() =>
    QueueType.map(({ value }) => ({
      value,
      label: mapQueueTypeToLabel(value),
    }))
  );

  return {
    options,
  };
}
