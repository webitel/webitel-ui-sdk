import { shallowMount } from '@vue/test-utils';

import WtLogo from '../wt-logo.vue';

describe('WtLogo', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtLogo);
		expect(wrapper.exists()).toBeTruthy();
	});

	it('renders an anchor with logoHref by default', () => {
		const wrapper = shallowMount(WtLogo, {
			props: {
				logoHref: 'https://example.com',
			},
		});
		expect(wrapper.element.tagName).toBe('A');
		expect(wrapper.attributes('href')).toBe('https://example.com');
	});

	it('renders a router-link when logoRoute is provided', () => {
		const wrapper = shallowMount(WtLogo, {
			props: {
				logoRoute: '/home',
			},
			global: {
				stubs: {
					RouterLink: {
						props: [
							'to',
						],
						template: '<a :href="to"><slot /></a>',
					},
				},
			},
		});
		expect(wrapper.attributes('href')).toBe('/home');
	});

	it('renders a plain span with no link attrs when disabled', () => {
		const wrapper = shallowMount(WtLogo, {
			props: {
				disabled: true,
				logoHref: 'https://example.com',
			},
		});
		expect(wrapper.element.tagName).toBe('SPAN');
		expect(wrapper.attributes('href')).toBeUndefined();
	});

	it('renders the logo image', () => {
		const wrapper = shallowMount(WtLogo);
		expect(wrapper.find('img.wt-logo').attributes('alt')).toBe('Webitel');
	});
});
