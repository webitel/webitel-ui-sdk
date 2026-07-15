/**
 * Vue-2-style event bus contract host apps pass to the ui-sdk
 * `install(app, { eventBus })` (provided app-wide as '$eventBus').
 */
export interface EventBus {
    $emit: (event: string, payload?: unknown) => void;
    $on: (event: string, handler: (payload?: unknown) => void) => void;
    $off: (event: string, handler?: (payload?: unknown) => void) => void;
}
export declare const EVENT_BUS_INJECTION_KEY = "$eventBus";
export declare const useEventBus: () => EventBus | undefined;
