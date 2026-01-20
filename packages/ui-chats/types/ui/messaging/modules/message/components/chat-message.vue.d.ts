import type { ChatMessageType } from "../../../types/ChatMessage.types";
type __VLS_Props = {
    message: ChatMessageType;
    showAvatar?: boolean;
    withoutAvatars?: boolean;
    username?: string;
};
declare var __VLS_1: {}, __VLS_44: {};
type __VLS_Slots = {} & {
    'before-message'?: (props: typeof __VLS_1) => any;
} & {
    'after-message'?: (props: typeof __VLS_44) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    clickOnImage: () => any;
    initializedPlayer: (player: object) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClickOnImage?: () => any;
    onInitializedPlayer?: (player: object) => any;
}>, {
    username: string;
    showAvatar: boolean;
    withoutAvatars: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
