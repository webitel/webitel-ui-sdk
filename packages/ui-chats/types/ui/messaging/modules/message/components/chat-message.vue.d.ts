import type { ChatMessageType } from "../../../types/ChatMessage.types";
type __VLS_Props = {
    message: ChatMessageType;
    showAvatar?: boolean;
    username?: string;
};
declare var __VLS_1: {}, __VLS_51: {};
type __VLS_Slots = {} & {
    'before-message'?: (props: typeof __VLS_1) => any;
} & {
    'after-message'?: (props: typeof __VLS_51) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "open-image": () => any;
    "initialized-player": (args_0: object) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onOpen-image"?: () => any;
    "onInitialized-player"?: (args_0: object) => any;
}>, {
    showAvatar: boolean;
    username: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
