import i18n from '../src/locale/i18n';
import Directives from '../src/directives';

// https://vue-styleguidist.github.io/Configuration.html#enhancepreviewapp
// https://github.com/vue-styleguidist/vue-styleguidist/issues/1381
export default ((app) => {
  Object.keys(Directives).forEach((name) => {
    app.directive(name, Directives[name]);
  });

  app.use(i18n);
});
