import type { I18n } from "vue-i18n";
import { messages } from "../locale";

export type UiChatsConfig = {
	i18n?: I18n;
};

export const defaultConfig: UiChatsConfig = {
	i18n: null,
};

export const setConfig = (conf: UiChatsConfig) => {
	Object.assign(defaultConfig, conf);

	if (!conf.i18n?.global) {
		throw new Error("i18n is required");
	}

	Object.entries(messages).forEach(([locale, localeMessages]) => {
		conf.i18n.global.mergeLocaleMessage(locale, localeMessages);
	});
};
