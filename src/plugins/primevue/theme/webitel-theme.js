import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import extend from '@webitel/styleguide/extend';
import primitive from '@webitel/styleguide/primitive';
import semantic from '@webitel/styleguide/semantic';

import components from './components/components';
import { playerCss } from './extend/player/player.js';

const WebitelTheme = definePreset(Aura, {
  semantic,

  components,

  extend,

  css: ({ dt }) => `
    ${playerCss({ dt })}
  `,

  primitive,
});

export default WebitelTheme;
