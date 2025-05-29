import PAutoComplete from 'primevue/autocomplete';
import PButton from 'primevue/button';
import PrimeVue from 'primevue/config';
import PInputText from 'primevue/inputtext';
import PPopover from 'primevue/popover';
import Tooltip from 'primevue/tooltip';

import WebitelTheme from './theme/webitel-theme.js';

const changeComponentCompatMode = (component) => {
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

  app.component('PButton', changeComponentCompatMode(PButton));
  app.component('PAutoComplete', changeComponentCompatMode(PAutoComplete));
  app.component('PInputText', changeComponentCompatMode(PInputText));
  app.component('PPopover', changeComponentCompatMode(PPopover));

  app.directive('tooltip', Tooltip);
};

export default initPrimevue;
