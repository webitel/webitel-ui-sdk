import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, defineComponent, h, nextTick, ref } from 'vue';

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

describe('useChatScroll — thread switch during a pending load', () => {
	it('does not restore the old thread’s scroll anchor into the new thread', async () => {
		const chatId = ref('a');
		const isLoading = ref(false);
		const container = ref<HTMLElement | null>(null);
		const Host = defineComponent({
			setup() {
				const api = useChatScroll({
					chatContainer: container,
					chatContent: ref(null),
					messages: computed(() => []),
					chatId: computed(() => chatId.value),
					isChatClosed: computed(() => false),
					isLoading,
				});
				return {
					api,
				};
			},
			render() {
				return h(
					'div',
					{
						ref: (el) => {
							container.value = el as HTMLElement;
						},
					},
					[
						h('div', {
							class: 'chat-message',
						}),
					],
				);
			},
		});
		const wrapper = mount(Host);
		await nextTick();
		const scrollTo = vi.fn();
		(container.value as HTMLElement).scrollTo = scrollTo;
		const { api } = wrapper.vm as unknown as {
			api: ReturnType<typeof useChatScroll>;
		};

		api.loadNextMessages(true, () => {
			isLoading.value = true;
		});
		await nextTick();
		chatId.value = 'b';
		await nextTick();
		await nextTick();
		scrollTo.mockClear();

		isLoading.value = false;
		await nextTick();
		await nextTick();

		// 'auto' is the prepend restore; scrollToBottom uses 'instant'
		expect(scrollTo).not.toHaveBeenCalledWith(
			expect.objectContaining({
				behavior: 'auto',
			}),
		);
		wrapper.unmount();
	});
});

describe('useChatScroll — fullscreen enter/exit', () => {
	let fullscreenElement: Element | null = null;

	const toggleFullscreen = (el: Element | null) => {
		fullscreenElement = el;
		document.dispatchEvent(new Event('fullscreenchange'));
	};

	// [Claude] happy-dom has no layout: emulate scroll metrics and the browser clamping scrollTop
	const mockScrollMetrics = (
		el: HTMLElement,
		metrics: {
			scrollHeight: number;
			clientHeight: number;
			scrollTop: number;
		},
	) => {
		const clamp = (top: number) =>
			Math.max(0, Math.min(top, metrics.scrollHeight - metrics.clientHeight));
		Object.defineProperty(el, 'scrollHeight', {
			configurable: true,
			get: () => metrics.scrollHeight,
		});
		Object.defineProperty(el, 'clientHeight', {
			configurable: true,
			get: () => metrics.clientHeight,
		});
		Object.defineProperty(el, 'scrollTop', {
			configurable: true,
			get: () => metrics.scrollTop,
			set: (top: number) => {
				metrics.scrollTop = clamp(top);
			},
		});
		el.scrollTo = ((options: ScrollToOptions) => {
			metrics.scrollTop = clamp(options.top ?? 0);
		}) as typeof el.scrollTo;

		return {
			scroll: () => el.dispatchEvent(new Event('scroll')),
			resizeViewport: (clientHeight: number) => {
				const prevScrollTop = metrics.scrollTop;
				metrics.clientHeight = clientHeight;
				metrics.scrollTop = clamp(metrics.scrollTop);
				if (metrics.scrollTop !== prevScrollTop)
					el.dispatchEvent(new Event('scroll'));
			},
		};
	};

	const mountChat = async () => {
		const container = ref<HTMLElement | null>(null);
		const content = ref<HTMLElement | null>(null);
		const Host = defineComponent({
			setup() {
				useChatScroll({
					chatContainer: container,
					chatContent: content,
					messages: computed(() => []),
					chatId: computed(() => 'c1'),
					isChatClosed: computed(() => false),
				});
				return () =>
					h(
						'div',
						{
							ref: container,
						},
						[
							h('div', {
								ref: content,
							}),
						],
					);
			},
		});
		const wrapper = mount(Host);
		await nextTick();
		await nextTick();
		return {
			wrapper,
			el: container.value as HTMLElement,
		};
	};

	beforeEach(() => {
		vi.useFakeTimers();
		fullscreenElement = null;
		Object.defineProperty(document, 'fullscreenElement', {
			configurable: true,
			get: () => fullscreenElement,
		});
	});

	afterEach(() => {
		vi.useRealTimers();
		delete (
			document as {
				fullscreenElement?: Element | null;
			}
		).fullscreenElement;
	});

	it('brings the chat back to the bottom after the window shrinks on exit', async () => {
		const { wrapper, el } = await mountChat();
		const metrics = {
			scrollHeight: 2273,
			clientHeight: 380,
			scrollTop: 1893,
		};
		const chat = mockScrollMetrics(el, metrics);
		chat.scroll();

		toggleFullscreen(document.createElement('div'));
		chat.resizeViewport(557); // the browser clamps scrollTop to 1716
		vi.advanceTimersByTime(1000);

		toggleFullscreen(null);
		chat.resizeViewport(380);
		vi.advanceTimersByTime(1000);

		expect(metrics.scrollTop).toBe(1893);
		wrapper.unmount();
	});

	it('keeps a position above the bottom instead of snapping to the bottom', async () => {
		const { wrapper, el } = await mountChat();
		const metrics = {
			scrollHeight: 2273,
			clientHeight: 380,
			scrollTop: 1800,
		};
		const chat = mockScrollMetrics(el, metrics);
		chat.scroll();

		toggleFullscreen(document.createElement('div'));
		chat.resizeViewport(557); // clamped to the bottom while in fullscreen
		vi.advanceTimersByTime(1000);

		toggleFullscreen(null);
		chat.resizeViewport(380);
		vi.advanceTimersByTime(1000);

		expect(metrics.scrollTop).toBe(1800);
		wrapper.unmount();
	});
});
