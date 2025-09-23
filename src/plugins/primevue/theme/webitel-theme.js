import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import semantic from '@webitel/styleguide/semantic';
import primitive from '@webitel/styleguide/primitive';

import components from './components/components';
import extend from './extend/extend';

const WebitelTheme = definePreset(Aura, {
  semantic,

  components,

  extend,

  primitive,
});

export default WebitelTheme;
