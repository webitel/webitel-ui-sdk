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
});
