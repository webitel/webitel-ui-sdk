import { ChannelType } from '@webitel/api-services/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const InteractionTypeLocale = {
	[ChannelType.Call]: 'objects.interactionType.call',
	[ChannelType.Chat]: 'objects.interactionType.chat',
	[ChannelType.Email]: 'objects.interactionType.email',
} as const;

export function useInteractionTypeOptions() {
	const { t } = useI18n();

	const options = computed(() =>
		Object.entries(InteractionTypeLocale).map(([value, locale]) => ({
			value,
			label: t(locale),
		})),
	);

	return {
		options,
	};
}
