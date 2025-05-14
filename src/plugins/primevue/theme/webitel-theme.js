import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import components from './components/components.js';
import extend from './extend/extend.js';
import semantic from './semantic/semantic.js';

const WebitelTheme = definePreset(Aura, {
  semantic,

  components,
  
  extend,
});

export default WebitelTheme;
