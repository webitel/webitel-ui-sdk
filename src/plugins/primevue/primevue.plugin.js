import PrimeVue from 'primevue/config';

import WebitelTheme from './theme/webitel-theme.js';

const initPrimevue = (app) => {
  app.use(PrimeVue, {
    theme: {
      preset: WebitelTheme,
      options: {
        darkModeSelector: 'theme--dark',
      },
    },
  });
};

export default initPrimevue;
