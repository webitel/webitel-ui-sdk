import PAutoComplete from 'primevue/autocomplete';
import PAvatar from 'primevue/avatar';
import PBreadcrumb from 'primevue/breadcrumb';
import PButton from 'primevue/button';
import PCheckbox from 'primevue/checkbox';
import PChip from 'primevue/chip';
import PColumn from 'primevue/column';
import PrimeVue from 'primevue/config';
import PTable from 'primevue/datatable';
import PDivider from 'primevue/divider';
import PGalleria from 'primevue/galleria';
import PImage from 'primevue/image';
import PInputText from 'primevue/inputtext';
import PMenubar from 'primevue/menubar';
import PPopover from 'primevue/popover';
import PRadio from 'primevue/radiobutton';
import PSlider from 'primevue/slider';
import PTextarea from 'primevue/textarea';
import PToggleSwitch from 'primevue/toggleswitch';
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
  app.component('PTable', changeComponentCompatMode(PTable));
  app.component('PColumn', changeComponentCompatMode(PColumn));
  app.component('PRadio', changeComponentCompatMode(PRadio));
  app.component('PChip', changeComponentCompatMode(PChip));
  app.component('PTextarea', changeComponentCompatMode(PTextarea));
  app.component('PToggleSwitch', changeComponentCompatMode(PToggleSwitch));
  app.component('PBreadcrumb', changeComponentCompatMode(PBreadcrumb));
  app.component('PSlider', changeComponentCompatMode(PSlider));
  app.component('PDivider', changeComponentCompatMode(PDivider));
  app.component('PImage', changeComponentCompatMode(PImage));
  app.component('PGalleria', changeComponentCompatMode(PGalleria));

  app.directive('tooltip', Tooltip);
};

export default initPrimevue;
