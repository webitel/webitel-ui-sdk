import { ChatAction, type SharedActionSlots } from "../types/ChatAction.types";
type __VLS_Props = {
	actions: ChatAction[];
};
type __VLS_Slots = SharedActionSlots;
declare const __VLS_base: import("vue").DefineComponent<
	__VLS_Props,
	{},
	{},
	{},
	{},
	import("vue").ComponentOptionsMixin,
	import("vue").ComponentOptionsMixin,
	{} & {
		sendMessage: () => any;
		attachFiles: (files: File[]) => any;
	},
	string,
	import("vue").PublicProps,
	Readonly<__VLS_Props> &
		Readonly<{
			onSendMessage?: () => any;
			onAttachFiles?: (files: File[]) => any;
		}>,
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
