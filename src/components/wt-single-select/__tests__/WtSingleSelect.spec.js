import { mount, shallowMount } from '@vue/test-utils';

import WtSingleSelect from '../wt-single-select.vue';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe('WtSingleSelect', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtSingleSelect);
		expect(wrapper.classes()).toContain('wt-single-select');
	});

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = shallowMount(WtSingleSelect);
		expect(
			wrapper
				.findComponent({
					name: 'wt-label',
				})
				.exists(),
		).toBe(false);
	});

	it('renders the label text when passed', () => {
		const wrapper = mount(WtSingleSelect, {
			props: {
				label: 'Choose one',
			},
		});
		expect(wrapper.find('.wt-select__label').text()).toBe('Choose one');
	});

	it('appends an asterisk to the label when required', () => {
		const wrapper = mount(WtSingleSelect, {
			props: {
				label: 'Choose one',
				required: true,
			},
		});
		expect(wrapper.find('.wt-select__label').text()).toBe('Choose one*');
	});

	it('applies the has-value modifier class once a value is selected', () => {
		const wrapper = shallowMount(WtSingleSelect, {
			props: {
				modelValue: 'a',
			},
		});
		expect(wrapper.classes()).toContain('wt-single-select--has-value');
	});

	it('does not apply the has-value modifier class without a value', () => {
		const wrapper = shallowMount(WtSingleSelect);
		expect(wrapper.classes()).not.toContain('wt-single-select--has-value');
	});

	it('normalizes an empty object model to an empty string', () => {
		const wrapper = mount(WtSingleSelect, {
			props: {
				modelValue: {},
			},
		});
		expect(wrapper.classes()).not.toContain('wt-single-select--has-value');
	});

	it('passes disabled and options down to the underlying select', () => {
		const options = [
			{
				label: 'One',
				value: 1,
			},
			{
				label: 'Two',
				value: 2,
			},
		];
		const wrapper = shallowMount(WtSingleSelect, {
			props: {
				disabled: true,
				options,
			},
		});
		const select = wrapper.findComponent({
			name: 'Select',
		});
		expect(select.attributes('disabled')).toBe('true');
	});

	it('maps size prop to the PrimeVue size scale', () => {
		const wrapper = shallowMount(WtSingleSelect, {
			props: {
				size: 'sm',
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'Select',
				})
				.attributes('size'),
		).toBe('small');
	});

	it('emits hide when the dropdown hides', async () => {
		const wrapper = shallowMount(WtSingleSelect);
		await wrapper
			.findComponent({
				name: 'Select',
			})
			.vm.$emit('hide');
		expect(wrapper.emitted().hide).toBeTruthy();
	});
});
