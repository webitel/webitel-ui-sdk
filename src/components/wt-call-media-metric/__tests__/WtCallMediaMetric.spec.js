import { mount } from '@vue/test-utils';

import { ConnectionQualityLevels } from '../../../enums';
import WtCallMediaMetric from '../wt-call-media-metric.vue';

describe('WtCallMediaMetric', () => {
	it('renders nothing when neither quality nor mosAvg is provided', () => {
		const wrapper = mount(WtCallMediaMetric);
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon',
				})
				.exists(),
		).toBe(false);
	});

	it('renders an icon matching the quality prop when provided directly', () => {
		const wrapper = mount(WtCallMediaMetric, {
			props: {
				quality: ConnectionQualityLevels.High,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon',
				})
				.props('icon'),
		).toBe(`ws-signal-${ConnectionQualityLevels.High}`);
	});

	it('derives quality from mosAvg when quality is not provided', () => {
		const wrapper = mount(WtCallMediaMetric, {
			props: {
				mosAvg: 4.5,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon',
				})
				.props('icon'),
		).toBe(`ws-signal-${ConnectionQualityLevels.High}`);
	});

	it('quality prop takes precedence over mosAvg', () => {
		const wrapper = mount(WtCallMediaMetric, {
			props: {
				quality: ConnectionQualityLevels.Low,
				mosAvg: 4.5,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon',
				})
				.props('icon'),
		).toBe(`ws-signal-${ConnectionQualityLevels.Low}`);
	});

	it('renders nothing when mosAvg does not resolve to a quality', () => {
		const wrapper = mount(WtCallMediaMetric);
		expect(wrapper.html()).toBe('<!--v-if-->');
	});

	it('passes size prop down to the icon', () => {
		const wrapper = mount(WtCallMediaMetric, {
			props: {
				quality: ConnectionQualityLevels.Medium,
				size: 'lg',
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon',
				})
				.props('size'),
		).toBe('lg');
	});
});
