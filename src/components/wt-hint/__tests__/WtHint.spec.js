import { flushPromises, mount, shallowMount } from '@vue/test-utils';

import WtHint from '../wt-hint.vue';

describe('WtHint', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtHint);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('renders the default info icon color', async () => {
		const wrapper = mount(WtHint);
		await flushPromises();
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.attributes('color'),
		).toBe('info');
	});

	it('applies a custom icon color', async () => {
		const wrapper = mount(WtHint, {
			props: {
				iconColor: 'error',
			},
		});
		await flushPromises();
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.attributes('color'),
		).toBe('error');
	});

	it('renders default slot content once the tooltip is shown', async () => {
		const content = 'Hint text';
		const wrapper = mount(WtHint, {
			slots: {
				default: content,
			},
		});
		await flushPromises();

		await wrapper.find('.wt-tooltip__activator').trigger('mouseenter');
		await flushPromises();

		expect(wrapper.text()).toContain(content);
	});
});
