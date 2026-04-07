import { mount, shallowMount } from '@vue/test-utils';

import WtButton from '../wt-button.vue';

describe('WtButton', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtButton);
		expect(wrapper.classes('wt-button')).toBe(true);
	});

	it('renders a button content via default slot', () => {
		const content = 'button content';
		const wrapper = mount(WtButton, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.text()).toContain(content);
	});

	it('renders button spinner', () => {
		const wrapper = shallowMount(WtButton, {
			props: {
				loading: true,
			},
		});
		expect(wrapper.classes('p-button--loading')).toBe(true);
	});
});
