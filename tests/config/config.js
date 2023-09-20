import { config } from '@vue/test-utils';
import WebitelUi from '@/install';
import { createI18n } from 'vue-i18n';
import i18n from '../../src/locale/i18n';
import en from '../../src/locale/en/en';

config.global.plugins = [[WebitelUi, {}], i18n];
