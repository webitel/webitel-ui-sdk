import { mount, shallowMount } from '@vue/test-utils';

import WtDummy from '../wt-dummy.vue';

describe('WtDummy', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtDummy);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('renders default localized text when text prop is not passed', () => {
		const wrapper = mount(WtDummy);
		expect(wrapper.find('.wt-dummy__text').text()).toBe(
			'There are no records yet',
		);
	});

	it('renders custom text when passed', () => {
		const wrapper = mount(WtDummy, {
			props: {
				text: 'Custom empty message',
			},
		});
		expect(wrapper.find('.wt-dummy__text').text()).toBe('Custom empty message');
	});

	it('hides text when hiddenText is true', () => {
		const wrapper = mount(WtDummy, {
			props: {
				hiddenText: true,
			},
		});
		expect(wrapper.find('.wt-dummy__text').exists()).toBe(false);
	});

	it('does not render an action button by default', () => {
		const wrapper = shallowMount(WtDummy);
		expect(
			wrapper
				.findComponent({
					name: 'wt-button',
				})
				.exists(),
		).toBe(false);
	});

	it('renders an action button and emits create when clicked', async () => {
		const wrapper = shallowMount(WtDummy, {
			props: {
				showAction: true,
			},
		});
		const button = wrapper.findComponent({
			name: 'wt-button',
		});
		expect(button.exists()).toBe(true);

		await button.vm.$emit('click');
		expect(wrapper.emitted().create).toBeTruthy();
	});

	it('uses the given size for the dummy image', () => {
		const wrapper = mount(WtDummy, {
			props: {
				size: 100,
			},
		});
		const img = wrapper.find('.wt-dummy__img img');
		expect(img.attributes('width')).toBe('100');
		expect(img.attributes('height')).toBe('100');
	});
});
