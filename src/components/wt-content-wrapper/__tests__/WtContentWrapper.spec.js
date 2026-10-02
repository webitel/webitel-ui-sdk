import { shallowMount } from '@vue/test-utils';

import WtContentWrapper from '../wt-content-wrapper.vue';

describe('WtContentWrapper', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtContentWrapper);
		expect(wrapper.classes('wt-content-wrapper')).toBe(true);
	});

	it('renders content via default slot', () => {
		const content = 'Content';
		const wrapper = shallowMount(WtContentWrapper, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.text()).toBe(content);
	});

	it('aligns content to the left by default', () => {
		const wrapper = shallowMount(WtContentWrapper);
		expect(wrapper.classes('wt-content-wrapper--align-left')).toBe(true);
	});

	it('applies align prop', () => {
		const wrapper = shallowMount(WtContentWrapper, {
			props: {
				align: 'stretch',
			},
		});
		expect(wrapper.classes('wt-content-wrapper--align-stretch')).toBe(true);
	});
});
