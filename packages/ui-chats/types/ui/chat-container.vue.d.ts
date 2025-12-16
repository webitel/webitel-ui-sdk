<<<<<<< HEAD
import { ComponentSize } from "@webitel/ui-sdk/enums";
import {
	ChatAction,
	type SharedActionSlots,
} from "./chat-footer/modules/user-input/types/ChatAction.types";
import type { ChatMessageType } from "./messaging/types/ChatMessage.types";
import type { ResultCallbacks } from "./utils/ResultCallbacks.types";
=======
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { ResultCallbacks } from './utils/ResultCallbacks.types';
import { ChatMessageType } from './messaging/types/ChatMessage.types';
import { ChatAction, SharedActionSlots } from './chat-footer/modules/user-input/types/ChatAction.types';
>>>>>>> parent of 420ffe845 (refactor: oxlint/oxfmt replaced to biome, + reformatted all files)
type __VLS_Props = {
    messages: ChatMessageType[];
    chatActions?: ChatAction[];
    size?: ComponentSize;
};
type __VLS_Slots = {
    main: () => any;
    footer: () => any;
} & SharedActionSlots;
<<<<<<< HEAD
declare const __VLS_base: import("vue").DefineComponent<
	__VLS_Props,
	{},
	{},
	{},
	{},
	import("vue").ComponentOptionsMixin,
	import("vue").ComponentOptionsMixin,
	{} & {
		"action:sendMessage": (text: string, options: ResultCallbacks) => any;
		"action:attachFiles": (files: File[], options: ResultCallbacks) => any;
	},
	string,
	import("vue").PublicProps,
	Readonly<__VLS_Props> &
		Readonly<{
			"onAction:sendMessage"?: (text: string, options: ResultCallbacks) => any;
			"onAction:attachFiles"?: (files: File[], options: ResultCallbacks) => any;
		}>,
	{
		chatActions: ChatAction[];
		size: ComponentSize;
	},
	{},
	{},
	{},
	string,
	import("vue").ComponentProvideOptions,
	false,
	{},
	any
>;
=======
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "action:sendMessage": (text: string, options: ResultCallbacks) => any;
    "action:attachFiles": (files: File[], options: ResultCallbacks) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onAction:sendMessage"?: (text: string, options: ResultCallbacks) => any;
    "onAction:attachFiles"?: (files: File[], options: ResultCallbacks) => any;
}>, {
    size: ComponentSize;
    chatActions: ChatAction[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
>>>>>>> parent of 420ffe845 (refactor: oxlint/oxfmt replaced to biome, + reformatted all files)
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
