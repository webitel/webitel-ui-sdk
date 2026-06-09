import deepmerge from 'deepmerge';
import type { PartialDeep } from 'type-fest';

import { fetchConfig } from './scripts/fetchConfig';

// Config values overwrite, they don't accumulate — let the source array win.
const overwriteArrays = (_destination: unknown[], source: unknown[]) => source;

export interface AppConfigModule<T> {
	/**
	 * Returns the resolved config, initializing it on first access.
	 */
	getConfig: () => Promise<T>;
	/**
	 * Fetches and resolves the config, replacing any previously cached value.
	 */
	initializeConfig: () => Promise<T>;
}

/**
 * Creates a reusable app config module.
 *
 * Each application provides its own config type `T` and a `defaultConfig` used
 * as the base. The fetched runtime config (see {@link fetchConfig}) is deep-merged
 * over the defaults.
 *
 * @example
 * ```ts
 * import { createAppConfig } from '@webitel/ui-sdk/modules/AppConfig';
 * import { defaultConfig } from './defaults/defaultConfig';
 * import type { AppConfig } from './types/AppConfig';
 *
 * export const { getConfig, initializeConfig } = createAppConfig<AppConfig>(defaultConfig);
 * ```
 */
export function createAppConfig<T>(
	defaultConfig: PartialDeep<T>,
): AppConfigModule<T> {
	let config: T;

	async function initializeConfig(): Promise<T> {
		const fetchedConfig = await fetchConfig<T>();
		config = deepmerge<Partial<T>>(defaultConfig as Partial<T>, fetchedConfig, {
			arrayMerge: overwriteArrays,
		}) as T;
		return config;
	}

	async function getConfig(): Promise<T> {
		if (!config) {
			config = await initializeConfig();
		}
		return config;
	}

	return {
		getConfig,
		initializeConfig,
	};
}

export { fetchConfig };
export type { PartialDeep };
