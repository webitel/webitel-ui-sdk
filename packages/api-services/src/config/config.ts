import type { I18n } from 'vue-i18n';

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
};
