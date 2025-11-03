import { FilterEnumOption } from '../../../../classes/Filter';

import { QueueType } from '@webitel/ui-sdk/enums';

export const QueueTypeOptions: Array<FilterEnumOption> = [
  {
    locale: `objects.queue.type.${QueueType.OFFLINE_QUEUE}`,
    value: '0',
  },
  {
    locale: `objects.queue.type.${QueueType.INBOUND_QUEUE}`,
    value: '1',
  },
  {
    locale: `objects.queue.type.${QueueType.OUTBOUND_IVR_QUEUE}`,
    value: '2',
  },
  {
    locale: `objects.queue.type.${QueueType.PREVIEW_DIALER}`,
    value: '3',
  },
  {
    locale: `objects.queue.type.${QueueType.PROGRESSIVE_DIALER}`,
    value: '4',
  },
  {
    locale: `objects.queue.type.${QueueType.PREDICTIVE_DIALER}`,
    value: '5',
  },
  {
    locale: `objects.queue.type.${QueueType.CHAT_INBOUND_QUEUE}`,
    value: '6',
  },
  {
    locale: `objects.queue.type.${QueueType.INBOUND_JOB_QUEUE}`,
    value: '7',
  },
  {
    locale: `objects.queue.type.${QueueType.OUTBOUND_JOB_QUEUE}`,
    value: '8',
  }
]
