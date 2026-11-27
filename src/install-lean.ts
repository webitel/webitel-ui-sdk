import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import type { App, Component, Directive } from 'vue';
import {
	EVENT_BUS_INJECTION_KEY,
	type EventBus,
} from './composables/useEventBus/useEventBus';
import {
	createPrimevueOptions,
	withCompatMode,
} from './plugins/primevue/primevue.options';

// [Claude] Lean alternative to the default plugin (src/install.ts) for bundles where size matters, such as the web widget. The default plugin registers every component and directive and pulls in fonts, global CSS, vidstack and all PrimeVue locales; this one only sets PrimeVue up with the Webitel theme and registers what the app passes in. Global CSS stays the app's job.
export type WebitelUiLeanInstallOptions = {
	/** ui-sdk components under their global names (`WtButton`, …). ui-sdk components render their children by global name without importing them, so pass those too: e.g. `WtButton` needs `WtLoader` and `WtBadge`. */
	components?: Record<string, Component>;
	/** PrimeVue components under the names ui-sdk templates use (`PButton`, `PPopover`, …). */
	primevueComponents?: Record<string, Component>;
	directives?: Record<string, Directive>;
	/** PrimeVue's built-in texts for one language, e.g. `en` from `primelocale/js/en.js`. */
	locale?: PrimeVueConfiguration['locale'];
	eventBus?: EventBus;
};

export type WebitelUiLeanPlugin = {
	install(app: App, options?: WebitelUiLeanInstallOptions): void;
};

const plugin: WebitelUiLeanPlugin = {
	install(
		app,
		{
			components = {},
			primevueComponents = {},
			directives = {},
			locale,
			eventBus,
		} = {},
	) {
		app.use(
			PrimeVue,
			createPrimevueOptions({
				locale,
			}),
		);
		Object.entries(primevueComponents).forEach(([name, component]) => {
			app.component(name, withCompatMode(component));
		});
		Object.entries(components).forEach(([name, component]) => {
			app.component(name, component);
		});
		Object.entries(directives).forEach(([name, directive]) => {
			app.directive(name, directive);
		});
		if (eventBus) {
			app.provide(EVENT_BUS_INJECTION_KEY, eventBus);
		}
	},
};

export default plugin;
