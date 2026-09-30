import { LoggerAction } from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const ActionLocale = {
	[LoggerAction.Create]: 'reusable.create',
	[LoggerAction.Update]: 'reusable.edit',
	[LoggerAction.Delete]: 'reusable.delete',
} as const;

export function useActionOptions() {
	const { t } = useI18n();

	const options = computed(() =>
		Object.entries(ActionLocale).map(([value, locale]) => ({
			value,
			label: t(locale),
		})),
	);

	return {
		options,
	};
}
