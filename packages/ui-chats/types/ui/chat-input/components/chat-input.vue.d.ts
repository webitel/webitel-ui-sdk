import { ChatAction } from '../enums/ChatAction.enum';
import { ComponentSize } from '@webitel/ui-sdk/enums';
type __VLS_Props = {
    actions: ChatAction[];
    size: ComponentSize;
};
type __VLS_ModelProps = {
    'draft': string;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:draft": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:draft"?: (value: string) => any;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
