import { mount, shallowMount } from '@vue/test-utils';

import WtLabel from '../wt-label.vue';

describe('WtLabel', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtLabel);
		expect(wrapper.classes('wt-label')).toBe(true);
	});

	it('renders default slot content', () => {
		const wrapper = shallowMount(WtLabel, {
			slots: {
				default: 'Field label',
			},
		});
		expect(wrapper.text()).toContain('Field label');
	});

	it('applies disabled/invalid/required modifier classes', () => {
		const wrapper = shallowMount(WtLabel, {
			props: {
				disabled: true,
				invalid: true,
				required: true,
			},
		});
		expect(wrapper.classes()).toContain('wt-label--disabled');
		expect(wrapper.classes()).toContain('wt-label--invalid');
		expect(wrapper.classes()).toContain('wt-label--required');
	});

	it('does not render a hint by default', () => {
		const wrapper = shallowMount(WtLabel);
		expect(
			wrapper
				.findComponent({
					name: 'wt-hint',
				})
				.exists(),
		).toBe(false);
	});

	it('renders a hint when the hint prop is passed', async () => {
		const wrapper = mount(WtLabel, {
			props: {
				hint: 'Extra info',
			},
		});
		const hint = wrapper.findComponent({
			name: 'wt-hint',
		});
		expect(hint.exists()).toBe(true);

		await hint.find('.wt-tooltip__activator').trigger('mouseenter');
		expect(wrapper.text()).toContain('Extra info');
	});
});
