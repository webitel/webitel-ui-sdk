import { mount, shallowMount } from '@vue/test-utils';

import WtSelectButton from '../wt-button-select.vue';

// helps to mock @floating-ui/vue autoUpdate method
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe('WtSelectButton', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtSelectButton);
		expect(wrapper.classes('wt-button-select')).toBe(true);
	});

	it('renders a button content via default slot', () => {
		const content = 'button content';
		const wrapper = mount(WtSelectButton, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.find('.wt-button-select__button').text()).toBe(content);
	});
});
