import { flushPromises } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import {
	client,
	message,
	operator,
	thread,
} from '../../../scripts/__tests__/fixtures';
import { ChatThreadMode } from '../../../types';
import { deferred, mountWithChats } from '../../__tests__/mountWithChats';
import ChatHistory from '../chat-history.vue';

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
	mountWithChats(ChatHistory, {
		props: {
			thread: thread(),
			messages: [],
			selfMemberId: operator.id,
			...props,
		},
	});

describe('ChatHistory', () => {
	it('renders dividers, messages and system notices', () => {
		const wrapper = setup({
			messages: [
				message({
					sender: client,
				}),
				message({
					sender: operator,
					system: {
						type: 'transferred',
					},
				}),
			],
		});
		expect(wrapper.findAll('.chat-date-divider')).toHaveLength(1);
		expect(wrapper.findAll('.chat-message')).toHaveLength(1);
		expect(wrapper.findAll('.chat-system-notice')).toHaveLength(1);
	});

	it('puts contact-centre messages on the outgoing side', () => {
		const wrapper = setup({
			messages: [
				message({
					sender: client,
				}),
				message({
					sender: operator,
				}),
			],
		});
		const rows = wrapper.findAll('.chat-message');
		expect(rows[0].classes()).not.toContain('chat-message--outgoing');
		expect(rows[1].classes()).toContain('chat-message--outgoing');
	});

	it('shows ticks only on the operator’s own messages', () => {
		const wrapper = setup({
			messages: [
				message({
					sender: client,
				}),
				message({
					sender: operator,
				}),
			],
		});
		const rows = wrapper.findAll('.chat-message');
		expect(rows[0].find('.message-status').exists()).toBe(false);
		expect(rows[1].find('.message-status').exists()).toBe(true);
	});

	// a rejoined operator gets a new member id, but their contact stays the same
	it('still recognises the operator’s messages after they rejoined under a new member id', () => {
		const me = {
			id: 'm-me',
			contact: {
				name: 'Dania',
				type: 'webitel',
				sub: '164',
				iss: 'webitel',
			},
		};
		const rejoined = {
			id: 'm-me-2',
			contact: {
				...me.contact,
			},
		};
		const wrapper = setup({
			thread: thread({
				members: [
					me,
					client,
				],
			}),
			selfMemberId: me.id,
			messages: [
				message({
					sender: rejoined,
				}),
			],
		});
		expect(wrapper.find('.message-status').exists()).toBe(true);
	});

	it('shows a tombstone for deleted messages', () => {
		const wrapper = setup({
			messages: [
				message({
					deleted: true,
					body: undefined,
				}),
			],
		});
		expect(wrapper.text()).toContain('Message deleted');
	});

	// Review Focus #2
	it('does not render an empty bubble for content it cannot draw', () => {
		const wrapper = setup({
			messages: [
				message({
					body: undefined,
					location: {
						latitude: 1,
						longitude: 2,
					},
				}),
			],
		});
		expect(wrapper.text()).toContain('Unsupported message');
	});

	it('mounts the gallery only once an image is opened', async () => {
		const wrapper = setup({
			messages: [
				message({
					body: undefined,
					images: [
						{
							id: 'i1',
							url: 'https://x/1.png',
							width: 4,
							height: 3,
						},
					],
				}),
			],
		});
		// the gallery carries its own hidden confirm popup; keep it out of the page until needed
		expect(wrapper.find('.galleria-stub').exists()).toBe(false);

		await wrapper.find('.message-attachments__image').trigger('click');
		expect(wrapper.find('.galleria-stub').exists()).toBe(true);
	});

	// the topmost entry anchors the scroll position while older items are prepended;
	// a divider must not, as a same-day page keeps its element in place
	it('marks only message and notice rows as scroll anchors', () => {
		const wrapper = setup({
			messages: [
				message({
					sender: client,
				}),
				message({
					sender: operator,
					system: {
						type: 'transferred',
					},
				}),
			],
		});
		const entries = wrapper.findAll('.chat-history__entry');
		expect(entries).toHaveLength(2);
		expect(entries[0].find('.chat-message').exists()).toBe(true);
		expect(
			wrapper.find('.chat-history__entry .chat-date-divider').exists(),
		).toBe(false);
	});

	it('shows the waiting line only in awaiting mode', async () => {
		const wrapper = setup({
			messages: [
				message(),
			],
			mode: ChatThreadMode.Awaiting,
		});
		expect(wrapper.find('.chat-history__awaiting').exists()).toBe(true);
		await wrapper.setProps({
			mode: ChatThreadMode.Active,
		});
		expect(wrapper.find('.chat-history__awaiting').exists()).toBe(false);
	});

	it('shows the top sentinel only while there is more history', async () => {
		const wrapper = setup({
			messages: [
				message(),
			],
			hasMore: false,
		});
		expect(wrapper.find('.chat-history__sentinel').exists()).toBe(false);
		await wrapper.setProps({
			hasMore: true,
		});
		expect(wrapper.find('.chat-history__sentinel').exists()).toBe(true);
	});

	it('shows one spinner while onLoadMore is pending and stops when it settles, even on failure', async () => {
		const pending = deferred();
		const onLoadMore = vi.fn(() => pending.promise);
		const wrapper = setup({
			messages: [
				message(),
			],
			hasMore: true,
			onLoadMore,
		});
		wrapper
			.findComponent({
				name: 'WtIntersectionObserver',
			})
			.vm.$emit('next');
		await flushPromises();
		expect(onLoadMore).toHaveBeenCalledTimes(1);
		expect(
			wrapper.find('.chat-history__sentinel').findAll('.wt-loader'),
		).toHaveLength(1);

		pending.reject(new Error('offline'));
		await flushPromises();
		expect(
			wrapper.find('.chat-history__sentinel').findAll('.wt-loader'),
		).toHaveLength(0);
	});
});
