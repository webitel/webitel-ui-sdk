import { InteractionHandledBy } from '@webitel/api-services/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const InteractionHandledByLocale = {
	[InteractionHandledBy.Agent]: 'objects.interactionHandledBy.agent',
	[InteractionHandledBy.Bot]: 'objects.interactionHandledBy.bot',
	[InteractionHandledBy.Ivr]: 'objects.interactionHandledBy.ivr',
} as const;

export function useInteractionHandledByOptions() {
	const { t } = useI18n();

	const options = computed(() =>
		Object.entries(InteractionHandledByLocale).map(([value, locale]) => ({
			value,
			label: t(locale),
		})),
	);

	return {
		options,
	};
}
