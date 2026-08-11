import type { AxiosInstance } from 'axios';

import { getDefaultInstance } from '../defaults/getDefaultInstance/getDefaultInstance';

let current: AxiosInstance | undefined;

/**
 * Sets the axios instance used by generated services when none is passed
 * explicitly, e.g. `getAgentService()`.
 *
 * Call it once at app bootstrap, before the first request. Generated services
 * still accept an instance per call — `getAgentService(myInstance)` — which
 * takes precedence over the one set here.
 *
 * @param instance - axios instance to use as the default
 */
export const setDefaultAxiosInstance = (instance: AxiosInstance) => {
	current = instance;
};

/**
 * Returns the current default axios instance, creating the built-in one
 * (see {@link getDefaultInstance}) on first use if none was set.
 */
export const getDefaultAxiosInstance = (): AxiosInstance =>
	(current ??= getDefaultInstance());

/*
 * Generated services import this as their default axios instance. It is a proxy
 * rather than the instance itself for two reasons:
 * - creation is lazy, so importing a generated module in node (tests, msw)
 *   doesn't run getDefaultInstance(), which touches localStorage;
 * - setDefaultAxiosInstance() still wins after generated modules are imported.
 */
const client = new Proxy((() => {}) as unknown as AxiosInstance, {
	get(_target, prop, receiver) {
		const instance = getDefaultAxiosInstance();
		const value = Reflect.get(instance, prop, receiver);
		return typeof value === 'function' ? value.bind(instance) : value;
	},
	set(_target, prop, value) {
		return Reflect.set(getDefaultAxiosInstance(), prop, value);
	},
	has(_target, prop) {
		return Reflect.has(getDefaultAxiosInstance(), prop);
	},
	apply(_target, _thisArg, args) {
		return (getDefaultAxiosInstance() as (...args: unknown[]) => unknown)(
			...args,
		);
	},
});

export default client;
