import { shallowMount } from '@vue/test-utils';

import WtToast from '../wt-toast.vue';

describe('WtToast', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtToast);
		expect(wrapper.exists()).toBe(true);
	});

	it('forwards attributes to the underlying PToast', () => {
		const wrapper = shallowMount(WtToast, {
			attrs: {
				position: 'bottom-right',
			},
		});
		expect(wrapper.attributes('position')).toBe('bottom-right');
	});
});
