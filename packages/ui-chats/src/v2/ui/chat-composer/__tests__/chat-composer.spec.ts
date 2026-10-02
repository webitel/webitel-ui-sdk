import { flushPromises } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { ChatComposerAction } from '../../../types';
import { deferred, mountWithChats } from '../../__tests__/mountWithChats';
import ChatComposer from '../chat-composer.vue';

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

// happy-dom has no execCommand; returning false sends insert-text-at-cursor
// down its own setRangeText + input-event fallback, as older browsers do
beforeAll(() => {
	if (typeof document.execCommand !== 'function') {
		document.execCommand = () => false;
	}
});

const setup = (props = {}) =>
	mountWithChats(ChatComposer, {
		props,
		attachTo: document.body,
	});

const type = async (wrapper: ReturnType<typeof setup>, text: string) => {
	await wrapper.find('textarea').setValue(text);
};
const pressEnter = (wrapper: ReturnType<typeof setup>, shiftKey = false) =>
	wrapper.find('textarea').trigger('keydown', {
		key: 'Enter',
		shiftKey,
	});

describe('ChatComposer', () => {
	it('sends the draft and clears it once onSend resolves', async () => {
		const onSend = vi.fn().mockResolvedValue(undefined);
		const wrapper = setup({
			onSend,
		});
		await type(wrapper, 'Hello');
		await wrapper.find('.chat-composer__send').trigger('click');
		await flushPromises();
		expect(onSend).toHaveBeenCalledWith('Hello');
		expect(wrapper.find('textarea').element.value).toBe('');
	});

	it('locks while pending, keeps the draft and passes the error on when onSend rejects', async () => {
		const pending = deferred();
		const onSend = vi.fn(() => pending.promise);
		const errorHandler = vi.fn();
		const wrapper = mountWithChats(ChatComposer, {
			props: {
				onSend,
			},
			attachTo: document.body,
			global: {
				config: {
					errorHandler,
				},
			},
		});
		await type(wrapper, 'Hello');
		await wrapper.find('.chat-composer__send').trigger('click');
		expect(wrapper.find('textarea').element.disabled).toBe(true);
		// browsers drop focus from a disabled field; happy-dom does not, so do it here
		wrapper.find('textarea').element.blur();

		const error = new Error('boom');
		pending.reject(error);
		await flushPromises();
		expect(wrapper.find('textarea').element.disabled).toBe(false);
		expect(wrapper.find('textarea').element.value).toBe('Hello');
		expect(errorHandler).toHaveBeenCalledWith(
			error,
			expect.anything(),
			expect.anything(),
		); // back in the field, ready to retry
		expect(document.activeElement).toBe(wrapper.find('textarea').element);
	});

	// Review Focus #4
	it('does not send twice while a send is pending', async () => {
		const pending = deferred();
		const onSend = vi.fn(() => pending.promise);
		const wrapper = setup({
			onSend,
		});
		await type(wrapper, 'Hello');
		await pressEnter(wrapper);
		await pressEnter(wrapper);
		await wrapper.find('.chat-composer__send').trigger('click');
		expect(onSend).toHaveBeenCalledTimes(1);
		pending.resolve();
		await flushPromises();
	});

	it('ignores an empty or whitespace draft', async () => {
		const onSend = vi.fn().mockResolvedValue(undefined);
		const wrapper = setup({
			onSend,
		});
		await type(wrapper, '   ');
		await pressEnter(wrapper);
		expect(onSend).not.toHaveBeenCalled();
	});

	it('sends on Enter, not on Shift+Enter, and not at all with submitOnEnter off', async () => {
		const onSend = vi.fn().mockResolvedValue(undefined);
		const wrapper = setup({
			onSend,
		});
		await type(wrapper, 'a');
		await pressEnter(wrapper, true);
		expect(onSend).not.toHaveBeenCalled();
		await pressEnter(wrapper);
		expect(onSend).toHaveBeenCalledTimes(1);

		const off = setup({
			onSend: vi.fn(),
			submitOnEnter: false,
		});
		await type(off, 'a');
		await pressEnter(off);
		expect(off.props('onSend')).not.toHaveBeenCalled();
	});

	it('renders only the actions it is given', () => {
		const wrapper = setup({
			actions: [
				ChatComposerAction.Send,
			],
		});
		expect(wrapper.find('.chat-composer__attach').exists()).toBe(false);
		expect(wrapper.find('.emoji-stub').exists()).toBe(false);
		expect(wrapper.find('.chat-composer__send').exists()).toBe(true);
	});

	it('passes picked files to onAttach', async () => {
		const onAttach = vi.fn().mockResolvedValue(undefined);
		const wrapper = setup({
			onAttach,
		});
		const input = wrapper.find('.chat-composer__file-input');
		const file = new File(
			[
				'x',
			],
			'a.txt',
			{
				type: 'text/plain',
			},
		);
		Object.defineProperty(input.element, 'files', {
			value: [
				file,
			],
			configurable: true,
		});
		await input.trigger('change');
		await flushPromises();
		expect(onAttach).toHaveBeenCalledWith([
			file,
		]);
	});

	it('lets slot content insert text into the draft', async () => {
		const wrapper = mountWithChats(ChatComposer, {
			attachTo: document.body,
			slots: {
				actions: `<template #actions="{ insertText }"><button class="quick-reply" @click="insertText('Thanks!')" /></template>`,
			},
		});
		await wrapper.find('.quick-reply').trigger('click');
		expect(wrapper.find('textarea').element.value).toContain('Thanks!');
	});

	it('inserts a picked emoji', async () => {
		const wrapper = setup();
		await wrapper.find('.emoji-stub').trigger('click');
		expect(wrapper.find('textarea').element.value).toContain('🙂');
	});

	it('works as a controlled v-model:draft', async () => {
		const wrapper = setup({
			draft: 'from app',
			'onUpdate:draft': (value: string) =>
				wrapper.setProps({
					draft: value,
				}),
		});
		expect(wrapper.find('textarea').element.value).toBe('from app');
		await type(wrapper, 'edited');
		expect(wrapper.props('draft')).toBe('edited');
	});
});
