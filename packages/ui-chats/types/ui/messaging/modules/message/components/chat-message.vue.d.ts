declare var __VLS_1: {}, __VLS_40: {};
type __VLS_Slots = {} & {
    'before-message'?: (props: typeof __VLS_1) => any;
} & {
    'after-message'?: (props: typeof __VLS_40) => any;
};
declare const __VLS_base: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    message: {
        type: ObjectConstructor;
        required: true;
    };
    size: {
        type: StringConstructor;
        default: "md";
    };
    showAvatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    username: {
        type: StringConstructor;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "open-image": (...args: any[]) => void;
    "initialized-player": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    message: {
        type: ObjectConstructor;
        required: true;
    };
    size: {
        type: StringConstructor;
        default: "md";
    };
    showAvatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    username: {
        type: StringConstructor;
    };
}>> & Readonly<{
    "onOpen-image"?: (...args: any[]) => any;
    "onInitialized-player"?: (...args: any[]) => any;
}>, {
    size: string;
    showAvatar: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
