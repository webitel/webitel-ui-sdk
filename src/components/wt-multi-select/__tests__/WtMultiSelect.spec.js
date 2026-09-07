import { mount, shallowMount } from '@vue/test-utils';

import WtMultiSelect from '../wt-multi-select.vue';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe('WtMultiSelect', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtMultiSelect);
		expect(wrapper.classes()).toContain('wt-multi-select');
	});

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = shallowMount(WtMultiSelect);
		expect(
			wrapper
				.findComponent({
					name: 'wt-label',
				})
				.exists(),
		).toBe(false);
	});

	it('renders the label text when passed', () => {
		const wrapper = mount(WtMultiSelect, {
			props: {
				label: 'Choose options',
			},
		});
		expect(wrapper.find('.wt-select__label').text()).toBe('Choose options');
	});

	it('appends an asterisk to the label when required', () => {
		const wrapper = mount(WtMultiSelect, {
			props: {
				label: 'Choose options',
				required: true,
			},
		});
		expect(wrapper.find('.wt-select__label').text()).toBe('Choose options*');
	});

	it('passes disabled down to the underlying multiselect', () => {
		const wrapper = shallowMount(WtMultiSelect, {
			props: {
				disabled: true,
			},
		});
		const select = wrapper.findComponent({
			name: 'MultiSelect',
		});
		expect(select.attributes('disabled')).toBe('true');
	});

	it('normalizes the model to an array', () => {
		const wrapper = mount(WtMultiSelect, {
			props: {
				modelValue: null,
			},
		});
		const select = wrapper.findComponent({
			name: 'MultiSelect',
		});
		expect(select.props('modelValue')).toEqual([]);
	});

	it('displays chips when chipsView is true', () => {
		const wrapper = shallowMount(WtMultiSelect, {
			props: {
				chipsView: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'MultiSelect',
				})
				.attributes('display'),
		).toBe('chip');
	});

	it('displays comma-separated values by default', () => {
		const wrapper = shallowMount(WtMultiSelect);
		expect(
			wrapper
				.findComponent({
					name: 'MultiSelect',
				})
				.attributes('display'),
		).toBe('comma');
	});

	it('emits hide when the dropdown hides', async () => {
		const wrapper = shallowMount(WtMultiSelect);
		await wrapper
			.findComponent({
				name: 'MultiSelect',
			})
			.vm.$emit('hide');
		expect(wrapper.emitted().hide).toBeTruthy();
	});
});
