import { messages } from '../locale';

/** Minimal i18n surface ui-chats needs — avoids vue-i18n schema variance issues. */
export type UiChatsI18n = {
	global: {
		mergeLocaleMessage: (locale: string, message: unknown) => void;
	};
};

export type UiChatsConfig = {
	i18n?: UiChatsI18n;
};

export const defaultConfig: UiChatsConfig = {};

export const setConfig = (conf: UiChatsConfig) => {
	Object.assign(defaultConfig, conf);

	if (!conf.i18n?.global) {
		throw new Error('i18n is required');
	}

	Object.entries(messages).forEach(([locale, localeMessages]) => {
		conf.i18n!.global.mergeLocaleMessage(locale, localeMessages);
	});
};
