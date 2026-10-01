import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { computed, defineComponent, h, ref } from 'vue';

import { useChatScroll } from '../useChatScroll';

const Host = defineComponent({
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const container = ref<HTMLElement | null>(null);
		const content = ref<HTMLElement | null>(null);
		const api = useChatScroll<{
			mine: boolean;
		}>({
			chatContainer: container,
			chatContent: content,
			messages: computed(
				() =>
					props.items as {
						mine: boolean;
					}[],
			),
			isSelf: (item) => item.mine,
			itemClass: 'row',
			chatId: computed(() => 'c1'),
			isChatClosed: computed(() => false),
		});
		return {
			container,
			content,
			api,
		};
	},
	render() {
		return h(
			'div',
			{
				ref: 'container',
			},
			[
				h('div', {
					ref: 'content',
				}),
			],
		);
	},
});

describe('useChatScroll (shared)', () => {
	it('mounts with a custom isSelf / itemClass and exposes its API', () => {
		const wrapper = mount(Host, {
			props: {
				items: [
					{
						mine: false,
					},
				],
			},
		});
		const { api } = wrapper.vm as unknown as {
			api: ReturnType<typeof useChatScroll>;
		};
		expect(api.newUnseenMessagesCount.value).toBe(0);
		expect(typeof api.scrollToBottom).toBe('function');
		wrapper.unmount();
	});

	it('still accepts v1 items without isSelf', () => {
		const V1Host = defineComponent({
			setup() {
				const container = ref<HTMLElement | null>(null);
				useChatScroll({
					chatContainer: container,
					chatContent: ref(null),
					messages: computed(() => [
						{
							member: {
								self: true,
							},
						},
					]),
					chatId: computed(() => 'c1'),
					isChatClosed: computed(() => false),
				});
				return () =>
					h('div', {
						ref: container,
					});
			},
		});
		expect(() => mount(V1Host).unmount()).not.toThrow();
	});
});
