import { ComponentSize } from '@webitel/ui-sdk/enums';
import { ChatMessageType } from './messaging/types/ChatMessage.types';
import { ChatAction, SharedActionSlots } from './chat-footer/modules/user-input/types/ChatAction.types';
type __VLS_Props = {
    messages: ChatMessageType[];
    chatActions?: ChatAction[];
    size?: ComponentSize;
};
type __VLS_Slots = {
    main: () => any;
    footer: () => any;
} & SharedActionSlots;
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
    chatActions: ChatAction[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
