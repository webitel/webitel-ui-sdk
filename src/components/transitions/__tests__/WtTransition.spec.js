import { mount } from '@vue/test-utils';

import WtTransition from '../wt-transition.vue';

describe('WtTransition', () => {
	it('renders default slot content', () => {
		const wrapper = mount(WtTransition, {
			slots: {
				default: '<div class="content">hello</div>',
			},
		});
		expect(wrapper.find('.content').text()).toBe('hello');
	});

	it('applies the default fast duration class', () => {
		const wrapper = mount(WtTransition, {
			slots: {
				default: '<div />',
			},
		});
		expect(wrapper.classes()).toContain('wt-transition--fast');
	});

	it('applies a custom duration class', () => {
		const wrapper = mount(WtTransition, {
			props: {
				duration: 'slow',
			},
			slots: {
				default: '<div />',
			},
		});
		expect(wrapper.classes()).toContain('wt-transition--slow');
	});
});
