import { mount } from '@vue/test-utils';

import WtReplaceTransition from '../cases/wt-replace-transition.vue';

describe('WtReplaceTransition', () => {
	it('renders default slot content', () => {
		const wrapper = mount(WtReplaceTransition, {
			slots: {
				default: '<div class="content">hello</div>',
			},
		});
		expect(wrapper.find('.content').text()).toBe('hello');
	});

	it('builds the transition name from the default opacity pattern', () => {
		const wrapper = mount(WtReplaceTransition, {
			slots: {
				default: '<div />',
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-transition',
				})
				.props('name'),
		).toBe('fade-opacity');
	});

	it('builds the transition name from a custom pattern', () => {
		const wrapper = mount(WtReplaceTransition, {
			props: {
				pattern: 'slide-up',
			},
			slots: {
				default: '<div />',
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-transition',
				})
				.props('name'),
		).toBe('fade-slide-up');
	});

	it('passes duration, appear and mode props through to wt-transition', () => {
		const wrapper = mount(WtReplaceTransition, {
			props: {
				duration: 'slow',
				appear: true,
				mode: 'in-out',
			},
			slots: {
				default: '<div />',
			},
		});
		const inner = wrapper.findComponent({
			name: 'wt-transition',
		});
		expect(inner.props('duration')).toBe('slow');
		expect(inner.props('appear')).toBe(true);
		expect(inner.props('mode')).toBe('in-out');
	});
});
