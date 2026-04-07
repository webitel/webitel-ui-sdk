import { mount, shallowMount } from '@vue/test-utils';

import WtLabel from '../../wt-label/wt-label.vue';
import WtTimeInput from '../wt-time-input.vue';

describe('WtTimeInput', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTimeInput, {
			stubs: {
				WtLabel,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('renders label text when passed', () => {
		const label = 'Hello there';
		const wrapper = mount(WtTimeInput, {
			stubs: {
				WtLabel,
			},
			props: {
				label,
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe(label);
	});

	it('emits model update from input-number', () => {
		const wrapper = shallowMount(WtTimeInput, {
			props: {
				modelValue: 0,
			},
		});

		wrapper
			.findComponent({
				name: 'wt-input-number',
			})
			.vm.$emit('update:modelValue', 7);
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			7,
		]);
	});
});
