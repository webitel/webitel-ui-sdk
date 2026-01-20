import type { I18n } from 'vue-i18n';
import { messages } from '../locale';

export type ApiServicesConfig = {
	eventBus?: {
		$emit: (event: string, payload: unknown) => unknown;
	};
	i18n?: I18n;
};

export const config: ApiServicesConfig = {
	eventBus: null,
	i18n: null,
};

export const setConfig = (conf: ApiServicesConfig) => {
	Object.assign(config, conf);

	// Automatically merge api-services locale messages into the provided i18n instance
	if (conf.i18n?.global) {
		Object.entries(messages).forEach(([locale, localeMessages]) => {
			conf.i18n.global.mergeLocaleMessage(locale, localeMessages);
		});
	}
};
