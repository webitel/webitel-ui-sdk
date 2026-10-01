import { flushPromises } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { message, operator, thread } from '../../../scripts/__tests__/fixtures';
import { ChatThreadMode } from '../../../types';
import { deferred, mountWithChats } from '../../__tests__/mountWithChats';
import ChatThread from '../chat-thread.vue';

vi.mock('@webitel/ui-sdk/components', async (importOriginal) => ({
	...(await importOriginal<typeof import('@webitel/ui-sdk/components')>()),
	WtChatEmoji: {
		name: 'WtChatEmoji',
		emits: [
			'insert-emoji',
		],
		template:
			'<button class="emoji-stub" @click="$emit(\'insert-emoji\', \'🙂\')" />',
	},
	WtGalleria: {
		name: 'WtGalleria',
		props: [
			'visible',
			'activeIndex',
			'value',
		],
		template: '<div class="galleria-stub" />',
	},
	WtVidstackPlayer: {
		name: 'WtVidstackPlayer',
		template: '<div class="player-stub" />',
	},
	WtPlayer: {
		name: 'WtPlayer',
		template: '<div class="player-stub" />',
	},
}));

const setup = (props = {}) =>
	mountWithChats(ChatThread, {
		attachTo: document.body,
		props: {
			thread: thread(),
			messages: [
				message(),
			],
			selfMemberId: operator.id,
			...props,
		},
	});

describe('ChatThread', () => {
	it('shows the composer only in active mode', async () => {
		const wrapper = setup({
			mode: ChatThreadMode.Active,
		});
		expect(wrapper.find('.chat-composer').exists()).toBe(true);
		await wrapper.setProps({
			mode: ChatThreadMode.Readonly,
		});
		expect(wrapper.find('.chat-composer').exists()).toBe(false);
		await wrapper.setProps({
			mode: ChatThreadMode.Awaiting,
		});
		expect(wrapper.find('.chat-composer').exists()).toBe(false);
	});

	// Review Focus #3
	it('drops the draft when the thread changes', async () => {
		const wrapper = setup();
		await wrapper.find('textarea').setValue('half-written');
		await wrapper.setProps({
			thread: thread({
				id: 'thread-2',
			}),
		});
		expect(wrapper.find('textarea').element.value).toBe('');
	});

	// Review Focus #3
	it('does not let a late send from the previous thread clear the new draft', async () => {
		const pending = deferred();
		const wrapper = setup({
			onSend: vi.fn(() => pending.promise),
		});
		await wrapper.find('textarea').setValue('first');
		await wrapper.find('.chat-composer__send').trigger('click');
		await wrapper.setProps({
			thread: thread({
				id: 'thread-2',
			}),
		});
		await wrapper.find('textarea').setValue('second');
		pending.resolve();
		await flushPromises();
		expect(wrapper.find('textarea').element.value).toBe('second');
	});

	it('forwards the actions slot to the composer', () => {
		const wrapper = mountWithChats(ChatThread, {
			props: {
				thread: thread(),
				messages: [],
				selfMemberId: operator.id,
			},
			slots: {
				actions: '<button class="quick-reply" />',
			},
		});
		expect(wrapper.find('.chat-composer .quick-reply').exists()).toBe(true);
	});
});
