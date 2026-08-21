import { mount, shallowMount } from '@vue/test-utils';

import WtIcon from '../../wt-icon/wt-icon.vue';
import WtLabel from '../../wt-label/wt-label.vue';
import WtCheckbox from '../wt-checkbox.vue';

describe('WtCheckbox', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtCheckbox, {
			props: {
				selected: false,
			},
			stubs: {
				WtLabel,
				WtIcon,
			},
		});
		expect(wrapper.classes('wt-checkbox')).toBe(true);
	});

	it('renders label text when passed', () => {
		const label = 'Hello there';
		const wrapper = mount(WtCheckbox, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				label,
				selected: false,
			},
		});
		expect(wrapper.find('.wt-checkbox__label').text()).toBe(label);
	});

	it('toggles passed value at click', () => {
		const selected = true;
		const wrapper = mount(WtCheckbox, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				selected,
			},
		});
		wrapper.find('input[type="checkbox"]').setValue(!selected);
		expect(wrapper.emitted()['update:selected'][0]).toEqual([
			!selected,
		]);
	});

	it('treats array model value as multi-select and checks by value membership', () => {
		const wrapper = mount(WtCheckbox, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				value: 'b',
				selected: [
					'a',
					'b',
				],
			},
		});
		expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(true);
	});

	it('is not checked when value is not present in array model', () => {
		const wrapper = mount(WtCheckbox, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				value: 'c',
				selected: [
					'a',
					'b',
				],
			},
		});
		expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(false);
	});

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = mount(WtCheckbox, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				selected: false,
			},
		});
		expect(wrapper.findComponent(WtLabel).exists()).toBe(false);
	});

	it('disables the underlying checkbox when disabled prop is true', () => {
		const wrapper = mount(WtCheckbox, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				selected: false,
				disabled: true,
			},
		});
		expect(
			wrapper.find('input[type="checkbox"]').attributes('disabled'),
		).toBeDefined();
	});
});
