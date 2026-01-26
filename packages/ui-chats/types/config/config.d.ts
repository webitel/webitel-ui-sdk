import type { I18n } from 'vue-i18n';
export type UiChatsConfig = {
    i18n?: I18n;
};
export declare const defaultConfig: UiChatsConfig;
export declare const setConfig: (conf: UiChatsConfig) => void;
