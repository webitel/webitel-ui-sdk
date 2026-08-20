import deepmerge from 'deepmerge';

export const processing = (overrides = {}) =>
	deepmerge(
		{
			enabled: false,
			formSchema: {},
			sec: 30,
			renewalSec: 15,
			prolongationOptions: {
				enabled: false,
				isTimeoutRetry: false,
				prolongationTimeSec: 30,
				repeatsNumber: 1,
			},
		},
		overrides,
	);
