import PAutoComplete from 'primevue/autocomplete';
import PButton from 'primevue/button';
import PCheckbox from 'primevue/checkbox';
import PChip from 'primevue/chip';
import PrimeVue from 'primevue/config';
import PDivider from 'primevue/divider';
import PInputText from 'primevue/inputtext';
import PPopover from 'primevue/popover';
import PSlider from 'primevue/slider'
import PRadio from 'primevue/radiobutton';
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
        darkModeSelector: '.theme--dark',
      },
    },
  });

  app.component('PButton', changeComponentCompatMode(PButton));
  app.component('PAutoComplete', changeComponentCompatMode(PAutoComplete));
  app.component('PInputText', changeComponentCompatMode(PInputText));
  app.component('PPopover', changeComponentCompatMode(PPopover));
  app.component('PCheckbox', changeComponentCompatMode(PCheckbox));
  app.component('PRadio', changeComponentCompatMode(PRadio));
  app.component('PChip', changeComponentCompatMode(PChip));
  app.component('PSlider', changeComponentCompatMode(PSlider));
  app.component('PDivider', changeComponentCompatMode(PDivider));

  app.directive('tooltip', Tooltip);
};

export default initPrimevue;
