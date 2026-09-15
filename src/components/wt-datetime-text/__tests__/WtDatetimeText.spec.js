import { mount } from '@vue/test-utils';

import { FormatDateMode } from '../../../enums';
import WtDatetimeText from '../wt-datetime-text.vue';

describe('WtDatetimeText', () => {
	it('renders the datetime formatted in datetime mode by default', () => {
		const wrapper = mount(WtDatetimeText, {
			props: {
				datetime: 1700000000000,
				timezone: 'UTC',
			},
		});
		expect(wrapper.text()).toBe('14.11.2023, 22:13:20');
	});

	it('renders using date mode', () => {
		const wrapper = mount(WtDatetimeText, {
			props: {
				datetime: 1700000000000,
				mode: FormatDateMode.DATE,
				timezone: 'UTC',
			},
		});
		expect(wrapper.text()).toBe('14.11.2023');
	});

	it('renders using time mode', () => {
		const wrapper = mount(WtDatetimeText, {
			props: {
				datetime: 1700000000000,
				mode: FormatDateMode.TIME,
				timezone: 'UTC',
			},
		});
		expect(wrapper.text()).toBe('22:13');
	});

	it('renders using a different timezone', () => {
		const wrapper = mount(WtDatetimeText, {
			props: {
				datetime: 1700000000000,
				mode: FormatDateMode.DATETIME_SHORT,
				timezone: 'Europe/Kyiv',
			},
		});
		expect(wrapper.text()).toBe('15.11.2023, 0:13');
	});
});
