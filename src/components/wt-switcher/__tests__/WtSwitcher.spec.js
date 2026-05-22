import { mount, shallowMount } from '@vue/test-utils';

import WtLabel from '../../wt-label/wt-label.vue';
import WtSwitcher from '../wt-switcher.vue';

describe('WtSwitcher', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtSwitcher, {
			props: {
				modelValue: false,
			},
			stubs: {
				WtLabel,
			},
		});
		expect(wrapper.classes('wt-switcher')).toBe(true);
	});

	it('renders label text when passed', () => {
		const label = 'Hello there';
		const wrapper = mount(WtSwitcher, {
			stubs: {
				WtLabel,
			},
			props: {
				label,
				modelValue: false,
			},
		});
		expect(wrapper.find('.wt-switcher__label').text()).toBe(label);
	});

	it('reflects left-label modifier class', () => {
		const wrapper = shallowMount(WtSwitcher, {
			props: {
				modelValue: false,
				labelLeft: true,
			},
		});
		expect(wrapper.classes('wt-switcher--label-left')).toBe(true);
	});
});
