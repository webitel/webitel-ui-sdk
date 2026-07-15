import type { I18n } from 'vue-i18n';
export type ApiServicesConfig = {
    eventBus?: {
        $emit: (event: string, payload: unknown) => unknown;
    };
    i18n?: I18n;
};
export declare const config: ApiServicesConfig;
export declare const setConfig: (conf: ApiServicesConfig) => void;
