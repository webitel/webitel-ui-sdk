import { shallowMount } from '@vue/test-utils';

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

	it('renders navigation rail before the body when showNavigationRail is set', () => {
		const wrapper = shallowMount(WtPage, {
			props: {
				showNavigationRail: true,
			},
		});
		const rail = wrapper.find('.wt-page__main > .wt-page__navigation-rail');
		expect(rail.exists()).toBe(true);
		expect(rail.element.nextElementSibling.classList).toContain(
			'wt-page__body',
		);
	});

	it('omits navigation rail by default', () => {
		const wrapper = shallowMount(WtPage);
		expect(wrapper.find('.wt-page__navigation-rail').exists()).toBe(false);
	});

	it('re-emits navigation rail events', () => {
		const item = {
			id: 'home',
			icon: 'home',
		};
		const wrapper = shallowMount(WtPage, {
			props: {
				showNavigationRail: true,
			},
		});
		const rail = wrapper.findComponent('.wt-page__navigation-rail');
		rail.vm.$emit('select', item);
		expect(wrapper.emitted('navigation-rail:select')[0]).toEqual([
			item,
		]);
	});
});
