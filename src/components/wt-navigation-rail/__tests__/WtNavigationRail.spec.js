import { mount } from '@vue/test-utils';

import WtNavigationRail from '../wt-navigation-rail.vue';

const top = [
	{
		id: 'home',
		icon: 'home',
		label: 'Home',
		badge: {
			value: 1,
		},
	},
	{
		id: 'calls',
		icon: 'call',
		label: 'Calls',
	},
];
const bottom = [
	{
		id: 'dialer',
		icon: 'call',
		label: 'Dialer',
	},
];

const mountRail = (props) =>
	mount(WtNavigationRail, {
		props,
		global: {
			stubs: {
				WtButton: false,
			},
		},
	});

describe('WtNavigationRail', () => {
	it('renders top and bottom buttons', () => {
		const wrapper = mountRail({
			topItems: top,
			bottomItems: bottom,
		});
		const groups = wrapper.findAll('.wt-navigation-rail__group');
		expect(groups[0].findAll('.navigation-rail-button')).toHaveLength(2);
		expect(groups[1].findAll('.navigation-rail-button')).toHaveLength(1);
	});

	it('marks active item', () => {
		const wrapper = mountRail({
			topItems: top,
			bottomItems: bottom,
			activeItemId: 'calls',
		});
		const active = wrapper.findAll('.navigation-rail-button--active');
		expect(active).toHaveLength(1);
		expect(active[0].attributes('aria-label')).toBe('Calls');
	});

	it('renders badge only for items with badge', () => {
		const wrapper = mountRail({
			topItems: top,
		});
		expect(wrapper.findAll('.wt-badge')).toHaveLength(1);
	});

	it('slots override default lists', () => {
		const wrapper = mount(WtNavigationRail, {
			props: {
				topItems: top,
				bottomItems: bottom,
			},
			slots: {
				top: '<div class="custom-top" />',
				bottom: '<div class="custom-bottom" />',
			},
		});
		expect(wrapper.find('.custom-top').exists()).toBe(true);
		expect(wrapper.find('.custom-bottom').exists()).toBe(true);
		expect(wrapper.findAll('.navigation-rail-button')).toHaveLength(0);
	});

	it('renders middle items between top and bottom', () => {
		const wrapper = mountRail({
			topItems: top,
			middleItems: [
				{
					id: 'mid',
					icon: 'chat',
					label: 'Middle',
				},
			],
			bottomItems: bottom,
		});
		const groups = wrapper.findAll('.wt-navigation-rail__group');
		expect(groups).toHaveLength(3);
		expect(groups[1].classes()).toContain('wt-navigation-rail__group--middle');
		expect(
			groups[1].find('.navigation-rail-button').attributes('aria-label'),
		).toBe('Middle');
	});

	it('renders middle slot', () => {
		const wrapper = mount(WtNavigationRail, {
			slots: {
				middle: '<div class="custom-middle" />',
			},
		});
		expect(wrapper.find('.custom-middle').exists()).toBe(true);
	});

	it('renders slot content without items', () => {
		const wrapper = mount(WtNavigationRail, {
			slots: {
				top: '<div class="custom-top" />',
			},
		});
		expect(wrapper.find('.custom-top').exists()).toBe(true);
	});

	it('emits select on click', async () => {
		const wrapper = mountRail({
			topItems: top,
			bottomItems: bottom,
		});
		await wrapper.findAll('button')[2].trigger('click');
		expect(wrapper.emitted('select')[0]).toEqual([
			bottom[0],
		]);
	});
});
