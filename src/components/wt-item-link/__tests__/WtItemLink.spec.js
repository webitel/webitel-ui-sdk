import { shallowMount } from '@vue/test-utils';

import WtItemLink from '../wt-item-link.vue';

const stubs = {
	RouterLink: {
		props: [
			'to',
			'target',
		],
		template:
			'<a :href="typeof to === \'string\' ? to : JSON.stringify(to)" :target="target"><slot /></a>',
	},
};

describe('WtItemLink', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtItemLink, {
			global: {
				stubs,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});

	it('renders default slot content', () => {
		const wrapper = shallowMount(WtItemLink, {
			global: {
				stubs,
			},
			slots: {
				default: 'Link text',
			},
		});
		expect(wrapper.text()).toBe('Link text');
	});

	it('uses the link prop as the route target when provided', () => {
		const wrapper = shallowMount(WtItemLink, {
			global: {
				stubs,
			},
			props: {
				link: '/directory/users/3',
			},
		});
		expect(wrapper.attributes('href')).toBe('/directory/users/3');
	});

	it('builds a route from the deprecated routeName/id props when link is not provided', () => {
		const wrapper = shallowMount(WtItemLink, {
			global: {
				stubs,
			},
			props: {
				routeName: 'users',
				id: 3,
			},
		});
		expect(wrapper.attributes('href')).toBe(
			JSON.stringify({
				name: 'users-edit',
				params: {
					id: 3,
				},
			}),
		);
	});

	it('applies the disabled class', () => {
		const wrapper = shallowMount(WtItemLink, {
			global: {
				stubs,
			},
			props: {
				disabled: true,
			},
		});
		expect(wrapper.classes()).toContain('wt-item-link--disabled');
	});

	it('applies the invisible class', () => {
		const wrapper = shallowMount(WtItemLink, {
			global: {
				stubs,
			},
			props: {
				invisible: true,
			},
		});
		expect(wrapper.classes()).toContain('wt-item-link--invisible');
	});

	it('defaults target to _self and forwards a custom target', () => {
		const wrapper = shallowMount(WtItemLink, {
			global: {
				stubs,
			},
		});
		expect(wrapper.attributes('target')).toBe('_self');
	});
});
