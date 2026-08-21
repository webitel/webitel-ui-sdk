import { shallowMount } from '@vue/test-utils';

import WtDivider from '../wt-divider.vue';

describe('WtDivider', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtDivider);
		expect(
			wrapper
				.findComponent({
					name: 'Divider',
				})
				.exists(),
		).toBe(true);
	});

	it('defaults to horizontal layout', () => {
		const wrapper = shallowMount(WtDivider);
		expect(wrapper.attributes('layout')).toBe('horizontal');
	});

	it('passes a custom variant as the layout prop', () => {
		const wrapper = shallowMount(WtDivider, {
			props: {
				variant: 'vertical',
			},
		});
		expect(wrapper.attributes('layout')).toBe('vertical');
	});
});
