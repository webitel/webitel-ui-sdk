import PButton from 'primevue/button';
import PrimeVue from 'primevue/config';
import PInputText from 'primevue/inputtext';

import WebitelTheme from './theme/webitel-theme.js';

const changeCompact = (component) => {
  component.compatConfig = { MODE: 3 };

  return component;
};

const initPrimevue = (app) => {
  app.use(PrimeVue, {
    theme: {
      preset: WebitelTheme,
      options: {
        darkModeSelector: 'theme--dark',
      },
    },
  });

  app.component('PButton', changeCompact(PButton));
  app.component('PInputText', changeCompact(PInputText));
};

export default initPrimevue;
