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

	it('renders sidebar via left-sidebar slot next to the body', () => {
		const content = 'Page sidebar';
		const wrapper = shallowMount(WtPage, {
			slots: {
				'left-sidebar': content,
			},
		});
		const sidebar = wrapper.find('.wt-page__main > .wt-page__sidebar');
		expect(sidebar.text()).toBe(content);
		expect(sidebar.element.nextElementSibling.classList).toContain(
			'wt-page__body',
		);
	});

	it('omits sidebar section without left-sidebar slot', () => {
		const wrapper = shallowMount(WtPage);
		expect(wrapper.find('.wt-page__sidebar').exists()).toBe(false);
	});
});
