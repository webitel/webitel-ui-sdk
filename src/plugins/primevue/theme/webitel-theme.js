import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import components from './components/components.js';
import semantic from './semantic/semantic.js';

const WebitelTheme = definePreset(Aura, {
  semantic,

  components,

  // EXTEND BLOCK
  extend: {
    my: {
      transition: {
        slow: '0.75s',
        normal: '0.5s',
        fast: '0.25s',
      },
      imageDisplay: 'block',
    },
  },
});

export default WebitelTheme;
