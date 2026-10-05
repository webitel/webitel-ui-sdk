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

describe('WtNavigationRail', () => {
	it('renders top and bottom buttons', () => {
		const wrapper = mount(WtNavigationRail, {
			props: {
				topItems: top,
				bottomItems: bottom,
			},
		});
		const groups = wrapper.findAll('.wt-navigation-rail__group');
		expect(groups[0].findAll('button')).toHaveLength(2);
		expect(groups[1].findAll('button')).toHaveLength(1);
	});

	it('marks active item', () => {
		const wrapper = mount(WtNavigationRail, {
			props: {
				topItems: top,
				bottomItems: bottom,
				activeItemId: 'calls',
			},
		});
		const active = wrapper.findAll('.navigation-rail-button--active');
		expect(active).toHaveLength(1);
		expect(active[0].attributes('aria-label')).toBe('Calls');
	});

	it('renders badge only for items with badge', () => {
		const wrapper = mount(WtNavigationRail, {
			props: {
				topItems: top,
			},
		});
		expect(wrapper.findAll('.navigation-rail-button__badge')).toHaveLength(1);
	});

	it('emits select on click', async () => {
		const wrapper = mount(WtNavigationRail, {
			props: {
				topItems: top,
				bottomItems: bottom,
			},
		});
		await wrapper.findAll('button')[2].trigger('click');
		expect(wrapper.emitted('select')[0]).toEqual([
			bottom[0],
		]);
	});
});
