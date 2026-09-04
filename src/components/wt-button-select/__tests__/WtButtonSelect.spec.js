import { mount, shallowMount } from '@vue/test-utils';

import WtButtonSelect from '../wt-button-select.vue';

// helps to mock @floating-ui/vue autoUpdate method
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe('WtButtonSelect', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtButtonSelect, {
			props: {
				options: [],
			},
		});
		expect(wrapper.classes('wt-button-select')).toBe(true);
	});

	it('renders a button content via default slot', () => {
		const content = 'button content';
		const wrapper = mount(WtButtonSelect, {
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
		const wrapper = shallowMount(WtButtonSelect, {
			props: {
				options: [],
			},
		});

		await wrapper.find('.wt-button-select__button').trigger('click');
		expect(wrapper.emitted().click).toBeTruthy();
	});

	it('passes disabled prop down to the main action button', () => {
		const wrapper = shallowMount(WtButtonSelect, {
			props: {
				options: [],
				disabled: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-button',
				})
				.props('disabled'),
		).toBe(true);
	});

	it('passes color prop down to the main action button', () => {
		const wrapper = shallowMount(WtButtonSelect, {
			props: {
				options: [],
				color: 'secondary',
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-button',
				})
				.props('color'),
		).toBe('secondary');
	});
});
