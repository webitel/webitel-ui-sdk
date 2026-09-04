import { mount, shallowMount } from '@vue/test-utils';

import WtIcon from '../../wt-icon/wt-icon.vue';
import WtLabel from '../../wt-label/wt-label.vue';
import WtDatepicker from '../wt-datepicker.vue';

describe('WtDatepicker', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtDatepicker, {
			stubs: {
				WtLabel,
				WtIcon,
			},
		});
		expect(wrapper.classes('wt-datepicker')).toBe(true);
	});

	it('renders label text when passed', () => {
		const label = 'Hello there';
		const wrapper = mount(WtDatepicker, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				label,
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe(label);
	});

	it('appends an asterisk to the label when required', () => {
		const label = 'Hello there';
		const wrapper = mount(WtDatepicker, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				label,
				required: true,
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe(`${label}*`);
	});

	it('passes the disabled prop down to the underlying datepicker', () => {
		const wrapper = shallowMount(WtDatepicker, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				disabled: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'DatePicker',
				})
				.attributes('disabled'),
		).toBe('true');
	});

	it('uses a default placeholder based on showTime', () => {
		const wrapper = shallowMount(WtDatepicker, {
			stubs: {
				WtLabel,
				WtIcon,
			},
			props: {
				showTime: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'DatePicker',
				})
				.attributes('placeholder'),
		).toBe('dd/mm/yyyy hh:mm');
	});
});
