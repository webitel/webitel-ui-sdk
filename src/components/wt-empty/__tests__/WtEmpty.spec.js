import { mount, shallowMount } from '@vue/test-utils';

import WtEmpty from '../wt-empty.vue';

describe('WtEmpty', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtEmpty);
		expect(wrapper.exists()).toBe(true);
	});

	it('does not render media/info/actions sections by default', () => {
		const wrapper = shallowMount(WtEmpty);
		expect(wrapper.find('.wt-empty__media').exists()).toBe(false);
		expect(wrapper.find('.wt-empty__info').exists()).toBe(false);
		expect(wrapper.find('.wt-empty__actions').exists()).toBe(false);
	});

	it('renders media when image prop is provided', () => {
		const wrapper = shallowMount(WtEmpty, {
			props: {
				image: 'image.svg',
			},
		});
		expect(wrapper.find('.wt-empty__media').exists()).toBe(true);
	});

	it('renders headline, title and text when provided', () => {
		const wrapper = mount(WtEmpty, {
			props: {
				headline: 'Headline',
				title: 'Title',
				text: 'Text',
			},
		});
		expect(wrapper.find('.wt-empty__headline').text()).toBe('Headline');
		expect(wrapper.find('.wt-empty__title').text()).toBe('Title');
		expect(wrapper.find('.wt-empty__text').text()).toBe('Text');
	});

	it('renders primary and secondary action buttons and emits click handlers', async () => {
		const wrapper = mount(WtEmpty, {
			props: {
				primaryActionText: 'Retry',
				secondaryActionText: 'Cancel',
			},
		});
		const buttons = wrapper.findAllComponents({
			name: 'wt-button',
		});
		expect(buttons.length).toBe(2);
		expect(buttons[0].text()).toBe('Retry');
		expect(buttons[1].text()).toBe('Cancel');

		await buttons[0].trigger('click');
		expect(wrapper.emitted()['click:primary']).toBeTruthy();

		await buttons[1].trigger('click');
		expect(wrapper.emitted()['click:secondary']).toBeTruthy();
	});

	it('disables primary/secondary action buttons independently', () => {
		const wrapper = shallowMount(WtEmpty, {
			props: {
				primaryActionText: 'Retry',
				secondaryActionText: 'Cancel',
				disabledPrimaryAction: true,
			},
		});
		const buttons = wrapper.findAllComponents({
			name: 'wt-button',
		});
		expect(buttons[0].props('disabled')).toBe(true);
		expect(buttons[1].props('disabled')).toBe(false);
	});

	it('applies the size modifier class', () => {
		const wrapper = shallowMount(WtEmpty, {
			props: {
				size: 'sm',
			},
		});
		expect(wrapper.classes()).toContain('wt-empty--size-sm');
	});
});
