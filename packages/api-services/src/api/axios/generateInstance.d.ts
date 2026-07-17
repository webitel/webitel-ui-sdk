import axios, { type CreateAxiosDefaults } from 'axios';
interface GenerateInstanceOptions extends CreateAxiosDefaults {
	interceptors?: {
		request?: Parameters<
			ReturnType<typeof axios.create>['interceptors']['request']['use']
		>[];
		response?: Parameters<
			ReturnType<typeof axios.create>['interceptors']['response']['use']
		>[];
	};
}
/**
 * Generates an Axios instance with custom configuration
 * @param options - Configuration options
 * @param options.interceptors - Request and response interceptors
 * @param options.baseURL - Base URL for the instance
 * @param options.rest - Additional Axios configuration options
 * @returns Configured Axios instance
 */
export declare const generateInstance: ({
	interceptors,
	baseURL,
	...rest
}?: GenerateInstanceOptions) => any;
export {};
