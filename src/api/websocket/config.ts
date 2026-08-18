import type { Config } from 'webitel-sdk';

export const getConfig = (): Partial<Config> => {
	let cliConfig: Partial<Config> = {};
	try {
		const CONFIG = JSON.parse(localStorage.getItem('CONFIG') as string);
		cliConfig = CONFIG.CLI || {};
	} catch {}
	return cliConfig;
};

const { hostname, protocol } = window.location;
const origin = `${protocol}//${hostname}`.replace(/^http/, 'ws');
const fallbackSocketPath =
	import.meta.env.VITE_WEB_SOCKET_URL || 'wss://test.webitel.me/ws';

export const endpoint =
	import.meta.env.MODE === 'production' ? `${origin}/ws` : fallbackSocketPath;
