import { config } from '@vue/test-utils';
import WebitelUi from '../../src/install.js';
import i18n from '../../src/locale/i18n.js';

config.global.plugins = [
  [WebitelUi, {}],
  i18n,
];
