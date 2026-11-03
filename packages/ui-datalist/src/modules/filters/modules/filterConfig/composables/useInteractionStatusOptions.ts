import { InteractionStatus } from '@webitel/api-services/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const InteractionStatusLocale = {
	[InteractionStatus.NotEvaluated]: 'objects.interactionStatus.not_evaluated',
	[InteractionStatus.Pending]: 'objects.interactionStatus.pending',
	[InteractionStatus.Skipped]: 'objects.interactionStatus.skipped',
	[InteractionStatus.Completed]: 'objects.interactionStatus.completed',
} as const;

export function useInteractionStatusOptions() {
	const { t } = useI18n();

	const options = computed(() =>
		Object.entries(InteractionStatusLocale).map(([value, locale]) => ({
			value,
			label: t(locale),
		})),
	);

	return {
		options,
	};
}
