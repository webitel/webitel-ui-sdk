import { flushPromises, shallowMount } from '@vue/test-utils';

vi.mock('clipboard-copy', () => ({
	default: vi.fn().mockResolvedValue(),
}));

import copy from 'clipboard-copy';
import WtCopyAction from '../wt-copy-action.vue';

describe('WtCopyAction', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		copy.mockClear();
	});

	afterEach(() => {
		vi.useRealTimers();
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
		expect(copy).toHaveBeenCalledWith('hello world');
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
