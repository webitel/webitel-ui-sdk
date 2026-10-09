import { mount, shallowMount } from '@vue/test-utils';

import WtPage from '../wt-page.vue';

describe('WtPage', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtPage);
		expect(wrapper.classes('wt-page')).toBe(true);
	});

	it('renders layouts into the body via default slot', () => {
		const content = 'Page layouts';
		const wrapper = shallowMount(WtPage, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.find('.wt-page__body').text()).toBe(content);
	});

	it('renders header via header slot', () => {
		const content = 'Page header';
		const wrapper = shallowMount(WtPage, {
			slots: {
				header: content,
			},
		});
		expect(wrapper.find('.wt-page__header').text()).toBe(content);
	});

	it('omits header section without header slot', () => {
		const wrapper = shallowMount(WtPage);
		expect(wrapper.find('.wt-page__header').exists()).toBe(false);
	});

	describe('navigation rail', () => {
		const navigationRail = {
			topItems: [
				{
					id: 'home',
					icon: 'home',
					label: 'Home',
				},
			],
			activeItemId: 'home',
		};
		const mountPage = (props) =>
			mount(WtPage, {
				props,
				global: {
					stubs: {
						WtButton: false,
					},
				},
			});

		it('does not render rail without navigationRail prop', () => {
			const wrapper = mountPage({});
			expect(wrapper.find('.wt-navigation-rail').exists()).toBe(false);
		});

		it('does not render rail while both lists are empty', () => {
			const wrapper = mountPage({
				navigationRail: {
					topItems: [],
					bottomItems: [],
				},
			});
			expect(wrapper.find('.wt-navigation-rail').exists()).toBe(false);
		});

		it('renders rail outside of the body when a list is not empty', () => {
			const wrapper = mountPage({
				navigationRail,
			});
			expect(
				wrapper.find('.wt-page__main > .wt-navigation-rail').exists(),
			).toBe(true);
			expect(wrapper.find('.wt-page__body .wt-navigation-rail').exists()).toBe(
				false,
			);
		});

		it('emits navigation-select on rail item click', async () => {
			const wrapper = mountPage({
				navigationRail,
			});
			await wrapper.find('button').trigger('click');
			expect(wrapper.emitted('navigation-select')[0]).toEqual([
				navigationRail.topItems[0],
			]);
		});
	});
});
