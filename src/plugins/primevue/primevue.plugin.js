import PrimeVue from 'primevue/config';

import WebitelTheme from './webitel-theme.js';

const initPrimevue = (app) => {
  app.use(PrimeVue, {
    prefix: 'p',
    theme: {
      preset: WebitelTheme,
      options: {
        darkModeSelector: 'theme--dark',
      },
    },
  });
};

export default initPrimevue;
