import 'vue-multiselect/dist/vue-multiselect.css';
import '@webitel/styleguide/fonts';
import 'plyr/src/sass/plyr.scss';
import './css/main.scss';
import './assets/icons/sprite/index.js';
import generateInstance from './api/axios/generateInstance.js';
import Components from './components/index.js'; // init all components
import Directives from './directives/index.js'; // init all directives
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
        if (router)
            app.use(router);
    },
    generateInstance,
};
//# sourceMappingURL=install.js.map