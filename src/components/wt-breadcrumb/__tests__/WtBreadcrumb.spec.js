import { mount, shallowMount } from '@vue/test-utils';

import WtBreadcrumb from '../wt-breadcrumb.vue';

describe('WtBreadcrumb', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtBreadcrumb, {
			props: {
				path: [],
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});

	it('renders an item for each path entry', () => {
		const path = [
			{
				name: 'directory',
			},
			{
				name: 'users',
				route: '/directory/users',
			},
		];
		const wrapper = mount(WtBreadcrumb, {
			props: {
				path,
			},
			global: {
				stubs: {
					RouterLink: {
						template: '<a><slot /></a>',
					},
				},
			},
		});
		const items = wrapper.findAll('.wt-breadcrumb__text');
		expect(items.length).toBe(path.length);
		expect(items[0].text()).toBe('directory');
		expect(items[1].text()).toBe('users');
	});

	it('renders a router-link for items with a route', () => {
		const path = [
			{
				name: 'directory',
			},
			{
				name: 'users',
				route: '/directory/users',
			},
		];
		const wrapper = mount(WtBreadcrumb, {
			props: {
				path,
			},
			global: {
				stubs: {
					RouterLink: {
						template: '<a><slot /></a>',
					},
				},
			},
		});
		const links = wrapper.findAll('a');
		expect(links.length).toBe(1);
		expect(links[0].text()).toBe('users');
	});

	it('renders a plain span for items without a route', () => {
		const path = [
			{
				name: 'directory',
			},
		];
		const wrapper = mount(WtBreadcrumb, {
			props: {
				path,
			},
			global: {
				stubs: {
					RouterLink: {
						template: '<a><slot /></a>',
					},
				},
			},
		});
		expect(wrapper.find('span.wt-breadcrumb__text').exists()).toBe(true);
		expect(wrapper.find('a').exists()).toBe(false);
	});

	it('marks the last item with the last modifier class', () => {
		const path = [
			{
				name: 'directory',
			},
			{
				name: 'users',
			},
		];
		const wrapper = mount(WtBreadcrumb, {
			props: {
				path,
			},
			global: {
				stubs: {
					RouterLink: {
						template: '<a><slot /></a>',
					},
				},
			},
		});
		const items = wrapper.findAll('.wt-breadcrumb__text');
		expect(items.at(-1).classes()).toContain('wt-breadcrumb__text--last');
		expect(items[0].classes()).not.toContain('wt-breadcrumb__text--last');
	});
});
