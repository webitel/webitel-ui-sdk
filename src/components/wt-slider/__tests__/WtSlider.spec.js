import { shallowMount } from '@vue/test-utils';

import WtSlider from '../wt-slider.vue';

describe('WtSlider', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtSlider);
		expect(
			wrapper
				.findComponent({
					name: 'Slider',
				})
				.exists(),
		).toBe(true);
	});

	it('applies default min/max/step to the underlying slider', () => {
		const wrapper = shallowMount(WtSlider);
		const slider = wrapper.findComponent({
			name: 'Slider',
		});
		expect(slider.attributes('min')).toBe('0');
		expect(slider.attributes('max')).toBe('100');
		expect(slider.attributes('step')).toBe('1');
	});

	it('passes custom min/max/step/disabled down', () => {
		const wrapper = shallowMount(WtSlider, {
			props: {
				min: 10,
				max: 20,
				step: 5,
				disabled: true,
			},
		});
		const slider = wrapper.findComponent({
			name: 'Slider',
		});
		expect(slider.attributes('min')).toBe('10');
		expect(slider.attributes('max')).toBe('20');
		expect(slider.attributes('step')).toBe('5');
		expect(slider.attributes('disabled')).toBe('true');
	});

	it('defaults to horizontal orientation', () => {
		const wrapper = shallowMount(WtSlider);
		expect(
			wrapper
				.findComponent({
					name: 'Slider',
				})
				.attributes('orientation'),
		).toBe('horizontal');
	});

	it('uses vertical orientation and applies height style when vertical is true', () => {
		const wrapper = shallowMount(WtSlider, {
			props: {
				vertical: true,
				height: 200,
			},
		});
		const slider = wrapper.findComponent({
			name: 'Slider',
		});
		expect(slider.attributes('orientation')).toBe('vertical');
		expect(slider.attributes('style')).toContain('height: 200px');
	});

	it('applies width style when horizontal and width is provided', () => {
		const wrapper = shallowMount(WtSlider, {
			props: {
				width: 300,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'Slider',
				})
				.attributes('style'),
		).toContain('width: 300px');
	});

	it('emits update:modelValue when the slider value changes', async () => {
		const wrapper = shallowMount(WtSlider, {
			props: {
				modelValue: 5,
			},
		});
		await wrapper
			.findComponent({
				name: 'Slider',
			})
			.vm.$emit('update:modelValue', 42);
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			42,
		]);
	});
});
