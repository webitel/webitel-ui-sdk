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
		const wrapper = shallowMount(WtSelectButton, {
			props: {
				options: [],
			},
		});
		expect(wrapper.classes('wt-button-select')).toBe(true);
	});

	it('renders a button content via default slot', () => {
		const content = 'button content';
		const wrapper = mount(WtSelectButton, {
			props: {
				options: [],
			},
			slots: {
				default: content,
			},
		});
		expect(wrapper.find('.wt-button-select__button').text()).toBe(content);
	});

	it('emits click from main action button', async () => {
		const wrapper = shallowMount(WtSelectButton, {
			props: {
				options: [],
			},
		});

		await wrapper.find('.wt-button-select__button').trigger('click');
		expect(wrapper.emitted().click).toBeTruthy();
	});
});
