import { mount, shallowMount } from '@vue/test-utils';

import WtIcon from '../../wt-icon/wt-icon.vue';
import WtLabel from '../../wt-label/wt-label.vue';
import WtRadio from '../wt-radio.vue';

describe('WtRadio', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtRadio, {
			props: {
				selected: '',
				value: 'v',
			},
			stubs: {
				WtLabel,
				WtIcon,
			},
		});
		expect(wrapper.classes('wt-radio')).toBe(true);
	});

	it('renders label text when passed', () => {
		const label = 'Hello there';
		const wrapper = mount(WtRadio, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				label,
				selected: '',
				value: 'v',
			},
		});
		expect(wrapper.find('.wt-radio__label').text()).toBe(label);
	});

	it('toggles passed value at click', () => {
		const selected = '';
		const value = 'jest';
		const wrapper = mount(WtRadio, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				selected,
				value,
			},
		});
		wrapper.find('input[type="radio"]').setValue();
		expect(wrapper.emitted()['update:selected'][0]).toEqual([
			value,
		]);
	});

	it('checks the radio input when value matches selected', () => {
		const wrapper = mount(WtRadio, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				selected: 'v',
				value: 'v',
			},
		});
		expect(wrapper.find('input[type="radio"]').element.checked).toBe(true);
	});

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = mount(WtRadio, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				selected: '',
				value: 'v',
			},
		});
		expect(wrapper.findComponent(WtLabel).exists()).toBe(false);
	});

	it('disables the underlying radio when disabled prop is true', () => {
		const wrapper = mount(WtRadio, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				selected: '',
				value: 'v',
				disabled: true,
			},
		});
		expect(
			wrapper.find('input[type="radio"]').attributes('disabled'),
		).toBeDefined();
	});
});
