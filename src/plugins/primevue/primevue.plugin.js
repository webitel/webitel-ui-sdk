import PAutoComplete from 'primevue/autocomplete';
import PAvatar from 'primevue/avatar';
import PBreadcrumb from 'primevue/breadcrumb';
import PButton from 'primevue/button';
import PCheckbox from 'primevue/checkbox';
import PChip from 'primevue/chip';
import PrimeVue from 'primevue/config';
import PDivider from 'primevue/divider';
import PInputText from 'primevue/inputtext';
import PMenubar from 'primevue/menubar';
import PPopover from 'primevue/popover';
import PRadio from 'primevue/radiobutton';
import PSlider from 'primevue/slider';
import PToolbar from 'primevue/toolbar';
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
  app.component('PMenubar', changeComponentCompatMode(PMenubar));
  app.component('PToolbar', changeComponentCompatMode(PToolbar));
  app.component('PAvatar', changeComponentCompatMode(PAvatar));
  app.component('PCheckbox', changeComponentCompatMode(PCheckbox));
  app.component('PRadio', changeComponentCompatMode(PRadio));
  app.component('PChip', changeComponentCompatMode(PChip));
  app.component('PBreadcrumb', changeComponentCompatMode(PBreadcrumb));
  app.component('PSlider', changeComponentCompatMode(PSlider));
  app.component('PDivider', changeComponentCompatMode(PDivider));

  app.directive('tooltip', Tooltip);
};

export default initPrimevue;
