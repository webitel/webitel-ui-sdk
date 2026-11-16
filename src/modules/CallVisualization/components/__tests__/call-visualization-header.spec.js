import { shallowMount } from '@vue/test-utils';

import CallVisualizationHeader from '../call-visualization-header.vue';

describe('CallVisualizationHeader', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(CallVisualizationHeader);
		expect(wrapper.isVisible()).toBe(true);
	});
});
