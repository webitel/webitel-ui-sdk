import 'vidstack/bundle';
import 'vue-multiselect/dist/vue-multiselect.css';
import '@webitel/styleguide/fonts';
import './css/main.css';
import './css/tailwind.css';

import { generateInstance } from '@webitel/api-services/api/axios';
import type { App } from 'vue';
import type { Router } from 'vue-router';
import { fillIconsRepository } from './assets/icons';
import Components from './components'; // init all components
import { EVENT_BUS_INJECTION_KEY } from './composables/useEventBus/useEventBus';
import Directives from './directives'; // init all directives
import initPrimevue from './plugins/primevue/primevue.plugin';

export { fillIconsRepository };

export type WebitelUiInstallOptions = {
	eventBus: unknown;
	globals?: Record<string, unknown>;
	/** Accepted for app wiring; not consumed by the plugin today. */
	router?: Router;
};

export default {
	install(app: App, { eventBus, globals = {} }: WebitelUiInstallOptions) {
		Object.keys(Directives).forEach((name) => {
			app.directive(name, Directives[name as keyof typeof Directives]);
		});
		Object.keys(Components).forEach((name) => {
			app.component(name, Components[name as keyof typeof Components]);
		});
		Object.keys(globals).forEach((globalKey) => {
			app.provide(globalKey, globals[globalKey]);
		});
		app.provide(EVENT_BUS_INJECTION_KEY, eventBus);
		initPrimevue(app);
	},
	generateInstance,
};
