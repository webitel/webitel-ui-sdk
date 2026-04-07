import { mount, shallowMount } from '@vue/test-utils';

import WtTimeInput from '../../wt-time-input/wt-time-input.vue';
import WtTimepicker from '../wt-timepicker.vue';

describe('WtTimepicker', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTimepicker, {
			stubs: {
				WtTimeInput: true,
			},
		});
		expect(wrapper.classes('wt-timepicker')).toBe(true);
	});

	it('renders only specified by format time inputs', () => {
		const wrapper = mount(WtTimepicker, {
			stubs: {
				WtTimeInput,
			},
			props: {
				format: 'mm',
			},
		});
		expect(wrapper.findAllComponents(WtTimeInput).length).toBe(1);
	});

	it('Correctly converts value from MIN time-input to output', async () => {
		const wrapper = mount(WtTimepicker, {
			props: {
				modelValue: 0,
			},
		});
		wrapper.findAllComponents(WtTimeInput)[0].vm.$emit('update:modelValue', 21);
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			21 * 60 * 60,
		]);
	});

	it('Correctly converts value from HOUR time-input to output', () => {
		const wrapper = mount(WtTimepicker, {
			stubs: {
				WtTimeInput,
			},
			props: {
				modelValue: 0,
			},
		});
		wrapper.findAllComponents(WtTimeInput)[1].vm.$emit('update:modelValue', 21);
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			21 * 60,
		]);
	});

	it('Correctly converts value from SEC time-input to output', () => {
		const wrapper = mount(WtTimepicker, {
			stubs: {
				WtTimeInput,
			},
			props: {
				modelValue: 0,
			},
		});
		wrapper.findAllComponents(WtTimeInput)[2].vm.$emit('update:modelValue', 21);
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			21,
		]);
	});
});
