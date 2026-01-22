import { type MaybeRef } from "vue";
type __VLS_ModelProps = {
    "text": MaybeRef<string>;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_ModelProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    enter: () => any;
    "update:text": (value: MaybeRef<string>) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_ModelProps> & Readonly<{
    onEnter?: () => any;
    "onUpdate:text"?: (value: MaybeRef<string>) => any;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
