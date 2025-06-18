import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import components from './components/components';
import extend from './extend/extend';
import semantic from './semantic/semantic';

const WebitelTheme = definePreset(Aura, {
  semantic,

  components,

  extend,
});

export default WebitelTheme;
