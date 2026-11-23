import { InteractionHandledBy } from '@webitel/api-services/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useInteractionHandledByOptions() {
	const { t } = useI18n();

	const options = computed(() =>
		Object.values(InteractionHandledBy).map((value) => ({
			value,
			label: t(`objects.interactionHandledBy.${value}`),
		})),
	);

	return {
		options,
	};
}
