import { shallowMount } from '@vue/test-utils';

import { WtApplication } from '@webitel/ui-sdk/enums';
import WtAppNavigator from '../wt-app-navigator.vue';

const apps = [
	{
		name: WtApplication.Admin,
		href: '',
	},
	{
		name: WtApplication.History,
		href: '',
	},
	{
		name: WtApplication.Supervisor,
		href: '',
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
});
