import 'vidstack/bundle';
import 'vue-multiselect/dist/vue-multiselect.css';
import '@webitel/styleguide/fonts';
import './css/main.css';
import './css/tailwind.css';

import { generateInstance } from '@webitel/api-services/api/axios';

import Components from './components'; // init all components
import { fillIconsRepository } from './assets/icons';
import Directives from './directives'; // init all directives
import initPrimevue from './plugins/primevue/primevue.plugin';

export { fillIconsRepository };

export default {
	install(app, { eventBus, router, globals = {} }) {
		Object.keys(Directives).forEach((name) => {
			app.directive(name, Directives[name]);
		});
		Object.keys(Components).forEach((name) => {
			app.component(name, Components[name]);
		});
		Object.keys(globals).forEach((globalKey) => {
			app.provide(globalKey, globals[globalKey]);
		});
		app.provide('$eventBus', eventBus);
		if (router) app.use(router);
		initPrimevue(app);
	},
	generateInstance,
};
