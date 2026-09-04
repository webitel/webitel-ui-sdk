import { shallowMount } from '@vue/test-utils';

import ExpandTransition from '../wt-expand-transition.vue';

describe('ExpandTransition', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(ExpandTransition);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders default slot content', () => {
		const wrapper = shallowMount(ExpandTransition, {
			slots: {
				default: '<div class="content">hello</div>',
			},
		});
		expect(wrapper.find('.content').text()).toBe('hello');
	});

	it('sets height to auto on afterEnter', () => {
		const element = document.createElement('div');
		ExpandTransition.methods.afterEnter(element);
		expect(element.style.height).toBe('auto');
	});
});
