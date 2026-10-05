import { shallowMount } from '@vue/test-utils';

import WtChatEmoji from '../wt-chat-emoji.vue';

const mountEmoji = (props = {}) =>
	shallowMount(WtChatEmoji, {
		props,
	});

describe('WtChatEmoji', () => {
	it('draws an outlined button by default', () => {
		const wrapper = mountEmoji();
		expect(
			wrapper
				.findComponent({
					name: 'WtButton',
				})
				.props('variant'),
		).toBe('outlined');
	});

	it('draws the requested variant', () => {
		const wrapper = mountEmoji({
			variant: 'text',
		});
		expect(
			wrapper
				.findComponent({
					name: 'WtButton',
				})
				.props('variant'),
		).toBe('text');
	});

	it('draws a filled button as active whatever the variant', () => {
		const wrapper = mountEmoji({
			variant: 'text',
			filled: true,
		});
		expect(
			wrapper
				.findComponent({
					name: 'WtButton',
				})
				.props('variant'),
		).toBe('active');
	});
});
