import type { I18n } from 'vue-i18n';
import { messages } from '../locale';

export type ApiServicesConfig = {
	eventBus?: {
		$emit: (event: string, payload: unknown) => unknown;
	} | null;
	i18n?: I18n | null;
};

export const config: ApiServicesConfig = {
	eventBus: null,
	i18n: null,
};

export const setConfig = (conf: ApiServicesConfig) => {
	Object.assign(config, conf);

	// Automatically merge api-services locale messages into the provided i18n instance
	const i18n = conf.i18n;
	if (i18n?.global) {
		Object.entries(messages).forEach(([locale, localeMessages]) => {
			i18n.global.mergeLocaleMessage(locale, localeMessages);
		});
	}
};
