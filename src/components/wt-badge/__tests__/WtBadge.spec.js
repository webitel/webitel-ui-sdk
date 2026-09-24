import { mount, shallowMount } from '@vue/test-utils';

import { BadgeColor, ComponentSize } from '../../../enums';
import WtBadge from '../wt-badge.vue';

describe('WtBadge', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtBadge);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('passes the value prop to the inner badge', () => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				value: '5',
			},
		});
		expect(wrapper.html()).toContain('value="5"');
	});

	it('does not render the inner badge when hidden is true', () => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				hidden: true,
			},
		});
		expect(wrapper.html()).not.toContain('badge-stub');
	});

	it('renders the inner badge when hidden is false', () => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				hidden: false,
			},
		});
		expect(wrapper.html()).toContain('badge-stub');
	});

	it('applies the wt-badge--color-{color} class using the default color', () => {
		const wrapper = shallowMount(WtBadge);
		expect(wrapper.html()).toContain(`wt-badge--color-${BadgeColor.ERROR}`);
	});

	it.each(
		Object.values(BadgeColor),
	)('applies the wt-badge--color-%s class', (color) => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				color,
			},
		});
		expect(wrapper.html()).toContain(`wt-badge--color-${color}`);
	});

	it('applies the wt-badge--size-{size} class using the default size', () => {
		const wrapper = shallowMount(WtBadge);
		expect(wrapper.html()).toContain(`wt-badge--size-${ComponentSize.SM}`);
	});

	it.each(
		Object.values(ComponentSize),
	)('applies the wt-badge--size-%s class', (size) => {
		const wrapper = shallowMount(WtBadge, {
			props: {
				size,
			},
		});
		expect(wrapper.html()).toContain(`wt-badge--size-${size}`);
	});

	it('does not apply the wt-badge-wrapper class when there is no default slot content', () => {
		const wrapper = shallowMount(WtBadge);
		expect(wrapper.classes()).not.toContain('wt-badge-wrapper');
	});

	it('applies the wt-badge-wrapper class when default slot has content', () => {
		const wrapper = shallowMount(WtBadge, {
			slots: {
				default: '<div class="trigger" />',
			},
		});
		expect(wrapper.classes()).toContain('wt-badge-wrapper');
	});

	it('renders default slot content as the wrapped trigger element', () => {
		const wrapper = shallowMount(WtBadge, {
			slots: {
				default: '<div class="trigger">trigger content</div>',
			},
		});
		expect(wrapper.find('.trigger').exists()).toBe(true);
		expect(wrapper.find('.trigger').text()).toBe('trigger content');
	});

	it('applies the wt-badge--overlay class to the inner badge when default slot has content', () => {
		const wrapper = shallowMount(WtBadge, {
			slots: {
				default: '<div class="trigger" />',
			},
		});
		expect(wrapper.html()).toContain('wt-badge--overlay');
	});

	it('does not apply the wt-badge--overlay class when default slot is empty', () => {
		const wrapper = shallowMount(WtBadge);
		expect(wrapper.html()).not.toContain('wt-badge--overlay');
	});

	it('renders badge-content slot content instead of the value', () => {
		const wrapper = mount(WtBadge, {
			props: {
				value: '5',
			},
			slots: {
				'badge-content': '<span class="icon">icon</span>',
			},
		});
		expect(wrapper.find('.icon').exists()).toBe(true);
	});
});
