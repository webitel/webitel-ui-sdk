import { shallowMount } from '@vue/test-utils';

import PlaybackControls from '../call-wave-playback-controls.vue';

const mountControls = (props = {}) =>
	shallowMount(PlaybackControls, {
		props: {
			playbackRate: 1,
			isPlaying: false,
			zoomInDisabled: false,
			zoomOutDisabled: false,
			...props,
		},
	});

const findButtons = (wrapper) =>
	wrapper.findAllComponents({
		name: 'wt-button',
	});

describe('Call wave playback controls', () => {
	it('highlights the active playback rate', () => {
		const wrapper = mountControls({
			playbackRate: 1.5,
		});
		const colors = findButtons(wrapper)
			.slice(0, 4)
			.map((button) => button.attributes('color'));
		expect(colors).toEqual([
			'secondary',
			'primary',
			'secondary',
			'secondary',
		]);
	});

	it('emits the clicked playback rate', () => {
		const wrapper = mountControls();
		findButtons(wrapper)[0].vm.$emit('click');
		expect(wrapper.emitted()['toggle-rate'][0]).toEqual([
			2,
		]);
	});

	it('emits zoom in and zoom out', () => {
		const wrapper = mountControls();
		const buttons = findButtons(wrapper);
		buttons[buttons.length - 2].vm.$emit('click');
		buttons[buttons.length - 1].vm.$emit('click');
		expect(wrapper.emitted()['zoom-in']).toBeTruthy();
		expect(wrapper.emitted()['zoom-out']).toBeTruthy();
	});
});
