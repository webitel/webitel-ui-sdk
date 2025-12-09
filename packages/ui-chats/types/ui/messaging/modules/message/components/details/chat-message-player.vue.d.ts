import type { ChatMessageFile } from "../../../../types/ChatMessage.types";
type __VLS_Props = {
    file: ChatMessageFile;
    type: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    initialized: (args_0: object) => any;
    open: (args_0: ChatMessageFile) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onInitialized?: (args_0: object) => any;
    onOpen?: (args_0: ChatMessageFile) => any;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
