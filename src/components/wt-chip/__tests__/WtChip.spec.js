import { mount, shallowMount } from '@vue/test-utils';

import WtChip from '../wt-chip.vue';

describe('WtChip', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtChip);
		expect(wrapper.classes('wt-chip')).toBe(true);
	});

	it('renders a chip content via default slot', () => {
		const content = 'chip content';
		const wrapper = mount(WtChip, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.text()).toContain(content);
	});
});
