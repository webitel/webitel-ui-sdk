import type { I18n } from 'vue-i18n';
import { messages } from '../locale';

export type UiChatsConfig = {
	i18n?: I18n;
};

export const config: UiChatsConfig = {
	i18n: null,
};

export const setConfig = (conf: UiChatsConfig) => {
	Object.assign(config, conf);

	// Automatically merge ui-chats locale messages into the provided i18n instance
	if (conf.i18n?.global) {
		Object.entries(messages).forEach(([locale, localeMessages]) => {
			conf.i18n.global.mergeLocaleMessage(locale, localeMessages);
		});
	}
};
