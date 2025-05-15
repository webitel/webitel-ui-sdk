import PButton from 'primevue/button';
import PrimeVue from 'primevue/config';

import WebitelTheme from './theme/webitel-theme.js';

const changeComponentCompactMode = (component) => {
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

  app.component('PButton', changeComponentCompactMode(PButton));
};

export default initPrimevue;
