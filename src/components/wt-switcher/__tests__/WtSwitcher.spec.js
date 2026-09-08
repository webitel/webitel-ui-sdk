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

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = shallowMount(WtSwitcher, {
			props: {
				modelValue: false,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-label',
				})
				.exists(),
		).toBe(false);
	});

	it('emits update:modelValue with the inverted value when toggled', async () => {
		const wrapper = shallowMount(WtSwitcher, {
			props: {
				modelValue: false,
			},
		});
		await wrapper
			.findComponent({
				name: 'ToggleSwitch',
			})
			.vm.$emit('update:modelValue', true);
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			true,
		]);
	});

	it('passes disabled down to the underlying switch', () => {
		const wrapper = shallowMount(WtSwitcher, {
			props: {
				modelValue: false,
				disabled: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'ToggleSwitch',
				})
				.attributes('disabled'),
		).toBe('true');
	});
});
