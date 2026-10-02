import { useI18n } from 'vue-i18n';

const V2_NAMESPACE = '@webitel/ui-chats.v2';

/** `t` scoped to the v2 namespace: `t('composer.placeholder')`. */
export const useChatsV2I18n = () => {
	const { t, locale } = useI18n();

	return {
		t: (path: string, named: Record<string, unknown> = {}) =>
			t(`${V2_NAMESPACE}.${path}`, named),
		locale,
	};
};
