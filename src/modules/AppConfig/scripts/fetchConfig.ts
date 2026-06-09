import deepmerge from 'deepmerge';
import jsoncParser from 'tiny-jsonc';

// Config values overwrite, they don't accumulate — let the source array win.
const overwriteArrays = (_destination: unknown[], source: unknown[]) => source;

/**
 * Fetches the application runtime config from static files served next to the app.
 *
 * Looks up `config.{json,jsonc}` and an optional `config.local.{json,jsonc}` overlay,
 * with the local file taking priority. The shape of the returned object is
 * application-specific, so the concrete type is provided by the caller.
 */
export async function fetchConfig<T>(): Promise<Partial<T>> {
	return await fetchWithLocalConfigPriority<T>();
}

async function fetchWithLocalConfigPriority<T>(): Promise<Partial<T>> {
	const localConfig = await fetchSupportedExtConfig('config.local');
	const config = await fetchSupportedExtConfig('config');

	return deepmerge(config ?? {}, localConfig ?? {}, {
		arrayMerge: overwriteArrays,
	}) as Partial<T>;
}

async function fetchSupportedExtConfig(fileName = 'config') {
	const supportedExtensions = [
		'.json',
		'.jsonc',
	];

	for (const extension of supportedExtensions) {
		try {
			const response = await fetch(`./${fileName}${extension}`);
			if (response.ok) {
				const configText = await response.text();
				return jsoncParser.parse(configText);
			}
		} catch {}
	}
	return null;
}
