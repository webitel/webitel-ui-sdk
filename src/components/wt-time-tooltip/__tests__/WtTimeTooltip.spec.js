import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import WtTimeTooltip from '../wt-time-tooltip.vue';

describe('WtTimeTooltip', () => {
	beforeEach(() => {
		localStorage.setItem('user-timezone-setting', 'Africa/Addis_Ababa');
	});

	afterEach(() => {
		localStorage.removeItem('user-timezone-setting');
	});

	const showTooltip = async (wrapper) => {
		await nextTick();
		await wrapper.find('.wt-tooltip__activator').trigger('mouseenter');
		await nextTick();
	};

	it('shows the operator zone when no label is passed', async () => {
		const wrapper = mount(WtTimeTooltip, {
			props: {
				text: '15.10.2026, 14:19:00',
			},
		});

		expect(wrapper.text()).toContain('15.10.2026, 14:19:00');
		await showTooltip(wrapper);
		expect(wrapper.text()).toContain('Africa/Addis_Ababa 03:00');
	});

	it('shows an explicit zone caption as-is', async () => {
		const wrapper = mount(WtTimeTooltip, {
			props: {
				text: '09:00',
				label: 'Europe/Kyiv 02:00',
			},
		});

		await showTooltip(wrapper);
		expect(wrapper.text()).toContain('Europe/Kyiv 02:00');
		expect(wrapper.text()).not.toContain('Africa/Addis_Ababa');
	});

	it('renders nothing when the time is empty', () => {
		const wrapper = mount(WtTimeTooltip, {
			props: {
				text: '',
			},
		});

		expect(wrapper.text()).toBe('');
		expect(wrapper.find('.wt-tooltip').exists()).toBe(false);
	});
});
