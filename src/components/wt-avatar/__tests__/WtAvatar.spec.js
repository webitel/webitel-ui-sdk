import { mount, shallowMount } from '@vue/test-utils';

import AbstractUserStatus from '../../../enums/AbstractUserStatus/AbstractUserStatus.enum.js';
import WtAvatar from '../wt-avatar.vue';

describe('WtAvatar', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtAvatar);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('renders an image when src is provided', () => {
		const wrapper = mount(WtAvatar, {
			props: {
				src: 'http://example.com/pic.png',
			},
		});
		const img = wrapper.find('.wt-avatar__img');
		expect(img.exists()).toBe(true);
		expect(img.attributes('src')).toBe('http://example.com/pic.png');
	});

	it('renders "N/A" letters when no src or username is provided', () => {
		const wrapper = mount(WtAvatar);
		expect(wrapper.find('.wt-avatar__img').exists()).toBe(false);
		expect(wrapper.find('.wt-avatar__letters-text').text()).toBe('N/A');
	});

	it('renders letters from username when src is not provided', () => {
		const wrapper = mount(WtAvatar, {
			props: {
				username: 'John Doe',
			},
		});
		expect(wrapper.find('.wt-avatar__img').exists()).toBe(false);
		expect(wrapper.find('.wt-avatar__letters-text').text()).toBe('JD');
	});

	it('renders single letter for a single-word username', () => {
		const wrapper = mount(WtAvatar, {
			props: {
				username: 'Cher',
			},
		});
		expect(wrapper.find('.wt-avatar__letters-text').text()).toBe('C');
	});

	it('renders bot icon when bot prop is true, ignoring username/src', () => {
		const wrapper = mount(WtAvatar, {
			props: {
				bot: true,
				username: 'John Doe',
			},
		});
		expect(wrapper.find('.wt-avatar__bot').exists()).toBe(true);
		expect(wrapper.find('.wt-avatar__letters-text').exists()).toBe(false);
		expect(wrapper.find('.wt-avatar__img').exists()).toBe(false);
	});

	it('does not render a badge by default', () => {
		const wrapper = mount(WtAvatar, {
			props: {
				username: 'John Doe',
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-badge',
				})
				.exists(),
		).toBe(false);
	});

	it('renders a badge for eligible statuses when badge is true', () => {
		const wrapper = mount(WtAvatar, {
			props: {
				badge: true,
				status: AbstractUserStatus.ONLINE,
			},
		});
		const badge = wrapper.findComponent({
			name: 'wt-badge',
		});
		expect(badge.exists()).toBe(true);
		expect(badge.props('iconBadge')).toBe(AbstractUserStatus.ONLINE);
	});

	it('renders a badge without an icon for non-eligible statuses when badge is true', () => {
		const wrapper = mount(WtAvatar, {
			props: {
				badge: true,
				status: AbstractUserStatus.OFFLINE,
			},
		});
		const badge = wrapper.findComponent({
			name: 'wt-badge',
		});
		expect(badge.exists()).toBe(true);
		expect(badge.props('iconBadge')).toBe(null);
	});

	it('applies the size class', () => {
		const wrapper = shallowMount(WtAvatar, {
			props: {
				size: 'lg',
			},
		});
		expect(wrapper.classes()).toContain('p-avatar-lg');
	});
});
