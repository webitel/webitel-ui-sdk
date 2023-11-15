import { config } from '@vue/test-utils';
import WebitelUi from '../../src/install';
import i18n from '../../src/locale/i18n';

config.global.plugins = [
  [WebitelUi, {}],
  i18n,
];
