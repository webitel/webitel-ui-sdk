import { WebitelContactsContact } from '@webitel/api-services/gen/models';
import type { ChatMessageType } from '../types/ChatMessage.types';
type __VLS_Props = {
    messages: ChatMessageType[];
    next?: boolean;
    isLoading?: boolean;
    withoutAvatars?: boolean;
    agentName?: string;
    contact?: WebitelContactsContact;
    chatId?: string;
    isChatClosed?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    loadNextMessages: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onLoadNextMessages?: () => any;
}>, {
    chatId: string;
    isChatClosed: boolean;
    isLoading: boolean;
    withoutAvatars: boolean;
    next: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
