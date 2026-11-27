import type { PrimeVueConfiguration } from 'primevue/config';
import type { Component } from 'vue';
import WebitelTheme from './theme/webitel-theme.js';

// [Claude] PrimeVue settings shared by the full plugin (primevue.plugin.js) and the lean install (src/install-lean.ts), so both render the same Webitel theme.
export const createPrimevueOptions = ({
	locale,
}: {
	locale?: PrimeVueConfiguration['locale'];
} = {}): PrimeVueConfiguration => ({
	theme: {
		preset: WebitelTheme,
		options: {
			darkModeSelector: '.theme--dark',
			cssLayer: {
				name: 'primevue',
				order: 'wt-default, base, primevue, wt-typography',
			},
		},
	},
	...(locale && {
		locale,
	}),
});

export const withCompatMode = <T extends Component>(component: T): T => {
	(
		component as T & {
			compatConfig?: unknown;
		}
	).compatConfig = {
		MODE: 3,
	};

	return component;
};
