import { mount, shallowMount } from '@vue/test-utils';

import { ComponentSize } from '../../../enums';
import WtVidstackPlayer from '../wt-vidstack-player.vue';

describe('WtVidstackPlayer', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtVidstackPlayer);
		expect(wrapper.classes()).toContain('wt-vidstack-player');
	});

	it('defaults to the sm size class', () => {
		const wrapper = shallowMount(WtVidstackPlayer);
		expect(wrapper.classes()).toContain('wt-vidstack-player--sm');
	});

	it('applies a custom size class', () => {
		const wrapper = shallowMount(WtVidstackPlayer, {
			props: {
				size: ComponentSize.LG,
			},
		});
		expect(wrapper.classes()).toContain('wt-vidstack-player--lg');
	});

	it('applies the video-object-fit modifier class', () => {
		const wrapper = shallowMount(WtVidstackPlayer, {
			props: {
				videoObjectFit: 'cover',
			},
		});
		expect(wrapper.classes()).toContain(
			'wt-vidstack-player-video-object-fit--cover',
		);
	});

	it('applies stretch/static/hide-background/mirror modifier classes', () => {
		const wrapper = shallowMount(WtVidstackPlayer, {
			props: {
				stretch: true,
				static: true,
				hideBackground: true,
				mirrorVideo: true,
			},
		});
		expect(wrapper.classes()).toEqual(
			expect.arrayContaining([
				'wt-vidstack-player--stretch',
				'wt-vidstack-player--static',
				'wt-vidstack-player--hide-background',
				'wt-vidstack-player--mirror-video',
			]),
		);
	});

	it('emits close when the layout requests close', async () => {
		const wrapper = shallowMount(WtVidstackPlayer);
		await wrapper
			.findComponent({
				name: 'VideoLayout',
			})
			.vm.$emit('close-player');
		expect(wrapper.emitted().close).toBeTruthy();
	});

	it('renders default content/controls-panel slots with the current size scope', () => {
		const wrapper = mount(WtVidstackPlayer, {
			props: {
				size: ComponentSize.MD,
			},
			slots: {
				content: `<template #content="{ size }"><div class="content-size">{{ size }}</div></template>`,
			},
		});
		expect(wrapper.find('.content-size').text()).toBe(ComponentSize.MD);
	});

	it('exposes the root element ref', () => {
		const wrapper = shallowMount(WtVidstackPlayer);
		expect(wrapper.vm.rootEl).toBeInstanceOf(HTMLElement);
	});
});
