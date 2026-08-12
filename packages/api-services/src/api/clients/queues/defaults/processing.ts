import deepmerge from 'deepmerge';

const processing = (processing = {}) =>
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
		processing,
	);

export default processing;
