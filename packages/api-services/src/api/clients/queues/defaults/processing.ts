import deepmerge from 'deepmerge';

export const processing = (overrides = {}) =>
	deepmerge(
		{
			enabled: false,
			formSchema: undefined,
			sec: 30,
			renewalSec: 15,
			autosave: false,
			prolongationOptions: {
				enabled: false,
				isTimeoutRetry: false,
				prolongationTimeSec: 30,
				repeatsNumber: 1,
			},
		},
		overrides,
	);
