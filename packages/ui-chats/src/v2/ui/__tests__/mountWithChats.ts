import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';

import { messages } from '../../../locale';

export const chatsI18n = () =>
	createI18n({
		legacy: false,
		locale: 'en',
		fallbackLocale: 'en',
		messages,
	});

export const mountWithChats: typeof mount = ((component, options = {}) =>
	mount(component, {
		...options,
		global: {
			...options.global,
			plugins: [
				...(options.global?.plugins ?? []),
				chatsI18n(),
			],
		},
	})) as typeof mount;

export const deferred = <T = void>() => {
	let resolve!: (value: T) => void;
	let reject!: (reason?: unknown) => void;
	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return {
		promise,
		resolve,
		reject,
	};
};
