export type ApiServicesConfig = {
	eventBus?: {
		$emit: (event: string, payload: unknown) => unknown;
	};
};

export const config: ApiServicesConfig = {
	eventBus: null,
};

export const setConfig = (conf: ApiServicesConfig) => {
	Object.assign(config, conf);
};
