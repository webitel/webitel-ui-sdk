import { mount, shallowMount } from '@vue/test-utils';

import { WtApplication } from '@webitel/ui-sdk/enums';
import WtAppNavigator from '../wt-app-navigator.vue';

const apps = [
	{
		name: WtApplication.Admin,
		href: '/admin',
	},
	{
		name: WtApplication.History,
		href: '/history',
	},
	{
		name: WtApplication.Supervisor,
		href: '/supervisor',
	},
];

describe('WtAppNavigator', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtAppNavigator);
		expect(wrapper.classes('wt-app-navigator')).toBe(true);
	});

	it('renders specified app cards', () => {
		const wrapper = shallowMount(WtAppNavigator, {
			props: {
				apps,
			},
		});
		expect(wrapper.findAll('.wt-app-navigator__card').length).toBe(3);
	});

	it('renders app cards ordered by the fixed navigator order, not input order', () => {
		const wrapper = shallowMount(WtAppNavigator, {
			props: {
				apps: [
					{
						name: WtApplication.Crm,
						href: '',
					},
					{
						name: WtApplication.Agent,
						href: '',
					},
					{
						name: WtApplication.Admin,
						href: '',
					},
				],
			},
		});
		const links = wrapper.findAll('.wt-app-navigator__card__link');
		expect(links.map((l) => l.attributes('href'))).toEqual(
			wrapper.vm.formattedApps.map((app) => app.href),
		);
		expect(wrapper.vm.formattedApps.map((app) => app.name)).toEqual([
			WtApplication.Agent,
			WtApplication.Admin,
			WtApplication.Crm,
		]);
	});

	it('marks the current app as active', () => {
		const wrapper = shallowMount(WtAppNavigator, {
			props: {
				apps,
				currentApp: WtApplication.History,
			},
		});
		const activeCard = wrapper.find('.wt-app-navigator__card.active');
		expect(activeCard.exists()).toBe(true);
		expect(activeCard.text()).toContain('History');
	});

	it('is closed by default and toggles open when the trigger button is clicked', async () => {
		const wrapper = mount(WtAppNavigator, {
			props: {
				apps,
			},
		});
		expect(wrapper.find('nav').attributes('style')).toContain('display: none');

		await wrapper.find('.wt-app-navigator__btn').trigger('click');
		expect(wrapper.find('nav').attributes('style') || '').not.toContain(
			'display: none',
		);

		await wrapper.find('.wt-app-navigator__btn').trigger('click');
		expect(wrapper.find('nav').attributes('style')).toContain('display: none');
	});
});
