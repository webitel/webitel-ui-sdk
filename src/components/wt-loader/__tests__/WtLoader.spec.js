import { mount, shallowMount } from '@vue/test-utils';

import WtLoader from '../wt-loader.vue';

describe('WtLoader', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtLoader);
		expect(wrapper.classes('wt-loader')).toBe(true);
	});

	it('renders the brand loader by default (size md)', () => {
		const wrapper = mount(WtLoader);
		expect(wrapper.classes()).toContain('wt-brand-loader');
	});

	it('renders the spinner loader for non-md sizes', () => {
		const wrapper = mount(WtLoader, {
			props: {
				size: 'sm',
			},
		});
		expect(wrapper.classes()).toContain('wt-spinner-loader');
		expect(wrapper.classes()).toContain('wt-spinner-loader--sm');
	});

	it('applies the color to the spinner loader', () => {
		const wrapper = mount(WtLoader, {
			props: {
				size: 'xs',
				color: 'icon',
			},
		});
		expect(wrapper.classes()).toContain('wt-spinner-loader--icon');
	});
});
