import { mount } from '@vue/test-utils';

import { ComponentSize } from '../../../enums';
import WtBadge from '../wt-badge.vue';

describe('WtBadge (new)', () => {
	it('renders a component', () => {
		const wrapper = mount(WtBadge);
		expect(wrapper.classes()).toContain('wt-badge');
	});

	it('renders the value prop', () => {
		const wrapper = mount(WtBadge, {
			props: {
				value: '5',
			},
		});
		expect(wrapper.text()).toContain('5');
	});

	it('renders slot content', () => {
		const wrapper = mount(WtBadge, {
			slots: {
				default: 'slot content',
			},
		});
		expect(wrapper.text()).toContain('slot content');
	});

	it('applies the default md size class', () => {
		const wrapper = mount(WtBadge);
		expect(wrapper.classes()).toContain(`p-badge--${ComponentSize.MD}`);
	});

	it('applies a custom size class', () => {
		const wrapper = mount(WtBadge, {
			props: {
				size: ComponentSize.SM,
			},
		});
		expect(wrapper.classes()).toContain(`p-badge--${ComponentSize.SM}`);
	});

	it('applies a severity class when provided', () => {
		const wrapper = mount(WtBadge, {
			props: {
				severity: 'success',
			},
		});
		expect(wrapper.classes()).toContain('p-badge--success');
	});

	it('does not apply a severity class when severity is null', () => {
		const wrapper = mount(WtBadge);
		expect(
			wrapper
				.classes()
				.some((c) => c.startsWith('p-badge--') && c !== 'p-badge--md'),
		).toBe(false);
	});
});
