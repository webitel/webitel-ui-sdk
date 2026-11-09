import { flushPromises, shallowMount } from '@vue/test-utils';

import WtCopyAction from '../wt-copy-action.vue';

// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807]
// spy on the Clipboard API instead of mocking the clipboard-copy module:
// the test setup loads every component before this file, so the module mock
// misses once another component (wt-password) imports wt-copy-action directly
describe('WtCopyAction', () => {
	let writeText;

	beforeEach(() => {
		vi.useFakeTimers();
		writeText = vi
			.spyOn(navigator.clipboard, 'writeText')
			.mockResolvedValue(undefined);
	});

	afterEach(() => {
		vi.useRealTimers();
		writeText.mockRestore();
	});

	it('renders a component', () => {
		const wrapper = shallowMount(WtCopyAction);
		expect(wrapper.classes()).toContain('copy-action');
	});

	it('renders the copy icon by default', () => {
		const wrapper = shallowMount(WtCopyAction);
		expect(wrapper.attributes('icon')).toBe('copy');
	});

	it('copies the value prop when clicked', async () => {
		const wrapper = shallowMount(WtCopyAction, {
			props: {
				value: 'hello world',
			},
		});
		await wrapper.trigger('click');
		await flushPromises();
		expect(writeText).toHaveBeenCalledWith('hello world');
	});

	it('shows the done icon after copying, then reverts after the timeout', async () => {
		const wrapper = shallowMount(WtCopyAction, {
			props: {
				value: 'hello world',
			},
		});
		await wrapper.trigger('click');
		await flushPromises();

		expect(wrapper.attributes('icon')).toBe('done');

		vi.advanceTimersByTime(1500);
		await wrapper.vm.$nextTick();

		expect(wrapper.attributes('icon')).toBe('copy');
	});
});
