import { ComponentSize } from "@webitel/ui-sdk/enums";
import { ChatAction } from "../enums/ChatAction.enum";
type __VLS_Props = {
	actions: ChatAction[];
	size: ComponentSize;
};
declare var __VLS_2: "sendMessage" | "attachFiles" | "emojiPicker",
	__VLS_3: {
		key: "sendMessage" | "attachFiles" | "emojiPicker";
	};
type __VLS_Slots = {} & {
	[K in NonNullable<typeof __VLS_2>]?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: import("vue").DefineComponent<
	__VLS_Props,
	{},
	{},
	{},
	{},
	import("vue").ComponentOptionsMixin,
	import("vue").ComponentOptionsMixin,
	{},
	string,
	import("vue").PublicProps,
	Readonly<__VLS_Props> & Readonly<{}>,
	{},
	{},
	{},
	{},
	string,
	import("vue").ComponentProvideOptions,
	false,
	{},
	any
>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
	new (): {
		$slots: S;
	};
};
