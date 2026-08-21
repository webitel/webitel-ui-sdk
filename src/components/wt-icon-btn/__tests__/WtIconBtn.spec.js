import { shallowMount } from '@vue/test-utils';

import WtIcon from '../../wt-icon/wt-icon.vue';
import WtIconBtn from '../wt-icon-btn.vue';

describe('WtIconBtn', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtIconBtn, {
			stubs: {
				WtIcon,
			},
			props: {
				icon: 'bucket',
			},
		});
		expect(wrapper.classes('wt-icon-btn')).toBe(true);
	});

	it('passes icon and other attrs through to wt-icon', () => {
		const wrapper = shallowMount(WtIconBtn, {
			stubs: {
				WtIcon,
			},
			attrs: {
				icon: 'bucket',
				color: 'error',
			},
		});
		const icon = wrapper.findComponent(WtIcon);
		expect(icon.props('icon')).toBe('bucket');
		expect(icon.props('color')).toBe('error');
	});

	it('applies the disabled class and forwards disabled to wt-icon', () => {
		const wrapper = shallowMount(WtIconBtn, {
			stubs: {
				WtIcon,
			},
			props: {
				disabled: true,
			},
			attrs: {
				icon: 'bucket',
			},
		});
		expect(wrapper.classes()).toContain('wt-icon-btn--disabled');
		expect(wrapper.findComponent(WtIcon).props('disabled')).toBe(true);
	});

	it('emits click and mousedown', async () => {
		const wrapper = shallowMount(WtIconBtn, {
			stubs: {
				WtIcon,
			},
			attrs: {
				icon: 'bucket',
			},
		});
		await wrapper.trigger('click');
		await wrapper.trigger('mousedown');
		expect(wrapper.emitted().click).toBeTruthy();
		expect(wrapper.emitted().mousedown).toBeTruthy();
	});
});
