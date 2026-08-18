import { QueueType } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useQueueTypeOptions() {
	const { t } = useI18n();

	const mapQueueTypeToLabel = (value: string | number) =>
		t(`objects.queue.type.${value}`);

	const options = computed(() =>
		Object.entries(QueueType)
			// staging only https://webitel.atlassian.net/browse/WS-2
			.filter(
				([, value]) =>
					import.meta.env.VITE_STAGING_ENV === 'true' ||
					value !== QueueType.IM_CHAT_QUEUE,
			)
			.map(([, value]) => ({
				value,
				label: mapQueueTypeToLabel(value),
			})),
	);

	return {
		options,
	};
}
