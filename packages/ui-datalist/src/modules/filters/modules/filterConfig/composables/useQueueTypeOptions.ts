import { QueueType } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useQueueTypeOptions() {
  const { t } = useI18n();

  const mapQueueTypeToLabel = (value: string) => {
    switch (value) {
      case QueueType.OFFLINE_QUEUE:
        return t(`objects.queue.type.${QueueType.OFFLINE_QUEUE}`);
      case QueueType.INBOUND_QUEUE:
        return t(`objects.queue.type.${QueueType.INBOUND_QUEUE}`);
      case QueueType.OUTBOUND_IVR_QUEUE:
        return t(`objects.queue.type.${QueueType.OUTBOUND_IVR_QUEUE}`);
      case QueueType.PREVIEW_DIALER:
        return t(`objects.queue.type.${QueueType.PREVIEW_DIALER}`);
      case QueueType.PROGRESSIVE_DIALER:
        return t(`objects.queue.type.${QueueType.PROGRESSIVE_DIALER}`);
      case QueueType.PREDICTIVE_DIALER:
        return t(`objects.queue.type.${QueueType.PREDICTIVE_DIALER}`);
      case QueueType.CHAT_INBOUND_QUEUE:
        return t(`objects.queue.type.${QueueType.CHAT_INBOUND_QUEUE}`);
      case QueueType.INBOUND_JOB_QUEUE:
        return t(`objects.queue.type.${QueueType.INBOUND_JOB_QUEUE}`);
      case QueueType.OUTBOUND_JOB_QUEUE:
        return t(`objects.queue.type.${QueueType.OUTBOUND_JOB_QUEUE}`);
      default:
        return value;
    }
  };

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
