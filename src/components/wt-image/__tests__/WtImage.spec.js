import { shallowMount } from '@vue/test-utils';

import WtImage from '../wt-image.vue';

describe('WtImage', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtImage);
		expect(wrapper.exists()).toBe(true);
	});

	it('applies width/height in px based on the size preset', () => {
		const wrapper = shallowMount(WtImage, {
			props: {
				size: 'sm',
				src: 'pic.png',
			},
		});
		expect(wrapper.attributes('style')).toContain('width: 128px');
		expect(wrapper.attributes('style')).toContain('height: 128px');
	});

	it('uses explicit width/height props when size is not passed', () => {
		const wrapper = shallowMount(WtImage, {
			props: {
				width: '50%',
				height: 300,
				src: 'pic.png',
			},
		});
		expect(wrapper.attributes('style')).toContain('width: 50%');
		expect(wrapper.attributes('style')).toContain('height: 300px');
	});

	it('does not render an overlay icon by default', () => {
		const wrapper = shallowMount(WtImage, {
			props: {
				src: 'pic.png',
			},
		});
		expect(wrapper.find('.wt-image__overlay-icon').exists()).toBe(false);
	});

	it('renders an overlay icon and uses a pointer cursor when overlayIcon is set', () => {
		const wrapper = shallowMount(WtImage, {
			props: {
				overlayIcon: 'edit',
				src: 'pic.png',
			},
		});
		expect(wrapper.find('.wt-image__overlay-icon').exists()).toBe(true);
		expect(wrapper.attributes('style')).toContain('cursor: pointer');
	});

	it('emits click when clicked', async () => {
		const wrapper = shallowMount(WtImage, {
			props: {
				src: 'pic.png',
			},
		});
		await wrapper.trigger('click');
		expect(wrapper.emitted().click).toBeTruthy();
	});

	it('renders custom content via default slot instead of the image', () => {
		const wrapper = shallowMount(WtImage, {
			props: {
				src: 'pic.png',
				alt: 'Alt text',
			},
			slots: {
				default: `<template #default="{ src, alt }"><span class="custom">{{ src }}-{{ alt }}</span></template>`,
			},
		});
		expect(wrapper.find('.custom').text()).toBe('pic.png-Alt text');
		expect(
			wrapper
				.findComponent({
					name: 'Image',
				})
				.exists(),
		).toBe(false);
	});
});
