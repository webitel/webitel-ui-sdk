import { InteractionStatus } from '@webitel/api-services/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useInteractionStatusOptions() {
	const { t } = useI18n();

	const options = computed(() =>
		Object.values(InteractionStatus).map((value) => ({
			value,
			label: t(`objects.interactionStatus.${value}`),
		})),
	);

	return {
		options,
	};
}
