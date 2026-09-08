import { shallowMount } from '@vue/test-utils';

import WtCard from '../wt-card.vue';

describe('WtCard', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtCard);
		expect(wrapper.classes('wt-card')).toBe(true);
	});

	it('renders content via default slot', () => {
		const content = 'card content';
		const wrapper = shallowMount(WtCard, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.text()).toContain(content);
	});
});
