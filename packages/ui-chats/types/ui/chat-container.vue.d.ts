import { ComponentSize } from '@webitel/ui-sdk/enums';
import { ChatMessageType } from './messaging/types/ChatMessage.types';
type __VLS_Props = {
    messages: ChatMessageType[];
    size?: ComponentSize;
};
declare var __VLS_1: {}, __VLS_7: {};
type __VLS_Slots = {} & {
    main?: (props: typeof __VLS_1) => any;
} & {
    footer?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    sendMessage: (draft: string, options: {
        onSuccess: () => void;
    }) => any;
    sendFile: (files: File[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSendMessage?: (draft: string, options: {
        onSuccess: () => void;
    }) => any;
    onSendFile?: (files: File[]) => any;
}>, {
    size: ComponentSize;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
