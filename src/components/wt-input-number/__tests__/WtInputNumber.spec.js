import { mount, shallowMount } from '@vue/test-utils';

import WtInputNumber from '../wt-input-number.vue';

describe('WtInputNumber', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtInputNumber);
		expect(wrapper.classes()).toContain('wt-input-number');
	});

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = shallowMount(WtInputNumber);
		expect(
			wrapper
				.findComponent({
					name: 'wt-label',
				})
				.exists(),
		).toBe(false);
	});

	it('renders the label text when passed', () => {
		const wrapper = mount(WtInputNumber, {
			props: {
				label: 'Amount',
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe('Amount');
	});

	it('appends an asterisk to the label when required', () => {
		const wrapper = mount(WtInputNumber, {
			props: {
				label: 'Amount',
				required: true,
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe('Amount*');
	});

	it('passes disabled and modelValue down to the underlying input', () => {
		const wrapper = mount(WtInputNumber, {
			props: {
				disabled: true,
				modelValue: 42,
			},
		});
		const input = wrapper.findComponent({
			name: 'InputNumber',
		});
		expect(input.props('disabled')).toBe(true);
		expect(input.props('modelValue')).toBe(42);
	});

	it('emits update:modelValue when the underlying input changes', async () => {
		const wrapper = mount(WtInputNumber);
		const input = wrapper.findComponent({
			name: 'InputNumber',
		});
		await input.vm.$emit('update:model-value', 7);
		expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			7,
		]);
	});

	it('renders prefix and suffix slots', () => {
		const wrapper = mount(WtInputNumber, {
			slots: {
				prefix: '$',
				suffix: 'USD',
			},
		});
		expect(wrapper.text()).toContain('$');
		expect(wrapper.text()).toContain('USD');
	});
});
