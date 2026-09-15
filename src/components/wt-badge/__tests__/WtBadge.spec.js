import { shallowMount } from '@vue/test-utils';

import AbstractUserStatus from '../../../enums/AbstractUserStatus/AbstractUserStatus.enum.js';
import WtBadge from '../wt-badge.vue';

describe('WtBadge', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtBadge);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('applies compat-mode class when there is no default slot content', () => {
		const wrapper = shallowMount(WtBadge);
		expect(wrapper.classes()).toContain('wt-badge--compat-mode');
	});

	it('does not apply compat-mode class when default slot has content', () => {
		const wrapper = shallowMount(WtBadge, {
			slots: {
				default: 'content',
			},
		});
		expect(wrapper.classes()).not.toContain('wt-badge--compat-mode');
	});

	it('applies the outside class when outside prop is true', () => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				outside: true,
			},
		});
		expect(wrapper.classes()).toContain('wt-badge--outside');
	});

	it('hides the indicator when hidden prop is true', () => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				hidden: true,
			},
		});
		expect(wrapper.find('.wt-badge-indicator').attributes('style')).toContain(
			'display: none',
		);
	});

	it('does not render an icon pic when iconBadge is not a known status', () => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				iconBadge: 'unknown',
			},
		});
		expect(wrapper.find('.wt-badge-indicator__pic').exists()).toBe(false);
	});

	it.each([
		AbstractUserStatus.DND,
		AbstractUserStatus.ONLINE,
		AbstractUserStatus.PAUSE,
	])('renders an icon pic for iconBadge=%s', (status) => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				iconBadge: status,
			},
		});
		const pic = wrapper.find('.wt-badge-indicator__pic');
		expect(pic.exists()).toBe(true);
		expect(pic.attributes('alt')).toBe(status);
	});

	it('applies the colorVariable as background color', () => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				colorVariable: 'success-color',
			},
		});
		expect(wrapper.find('.wt-badge-indicator').attributes('style')).toContain(
			'var(--success-color)',
		);
	});
});
