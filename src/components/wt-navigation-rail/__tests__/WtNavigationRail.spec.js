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

	it('renders nothing while both lists are empty', () => {
		const wrapper = mountRail({});
		expect(wrapper.find('.wt-navigation-rail').exists()).toBe(false);
	});

	it('renders when only one list is not empty', () => {
		const wrapper = mountRail({
			bottomItems: bottom,
		});
		expect(wrapper.find('.wt-navigation-rail').exists()).toBe(true);
		expect(wrapper.findAll('.wt-navigation-rail__group')).toHaveLength(1);
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
