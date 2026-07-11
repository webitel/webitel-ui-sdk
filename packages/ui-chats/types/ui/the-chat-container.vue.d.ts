import { WebitelContactsContact } from '@webitel/api-services/gen/models';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import {
	ChatAction,
	type SharedActionSlots,
} from './chat-footer/modules/user-input/enums/ChatAction.enum';
import type { ChatMessageType } from './messaging/types/ChatMessage.types';
import type { ResultCallbacks } from './utils/ResultCallbacks.types';
type __VLS_Props = {
	messages: ChatMessageType[];
	chatActions?: ChatAction[];
	size?: ComponentSize;
	canLoadNextMessages?: boolean;
	isNextMessagesLoading?: boolean;
	withoutAvatars?: boolean;
	readonly?: boolean;
	agentName?: string;
	contact?: WebitelContactsContact;
};
type __VLS_Slots = {
	main: () => unknown;
	footer: () => unknown;
} & SharedActionSlots;
declare const __VLS_base: import('vue').DefineComponent<
	__VLS_Props,
	{},
	{},
	{},
	{},
	import('vue').ComponentOptionsMixin,
	import('vue').ComponentOptionsMixin,
	{} & {
		loadNextMessages: () => any;
		'action:sendMessage': (text: string, options: ResultCallbacks) => any;
		'action:attachFiles': (files: File[], options: ResultCallbacks) => any;
	},
	string,
	import('vue').PublicProps,
	Readonly<__VLS_Props> &
		Readonly<{
			onLoadNextMessages?: () => any;
			'onAction:sendMessage'?: (text: string, options: ResultCallbacks) => any;
			'onAction:attachFiles'?: (files: File[], options: ResultCallbacks) => any;
		}>,
	{
		size: ComponentSize;
		withoutAvatars: boolean;
		chatActions: ChatAction[];
		canLoadNextMessages: boolean;
		isNextMessagesLoading: boolean;
		readonly: boolean;
	},
	{},
	{},
	{},
	string,
	import('vue').ComponentProvideOptions,
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
