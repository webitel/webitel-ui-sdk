import { shallowMount } from '@vue/test-utils';

import WtRoundedAction from '../wt-rounded-action.vue';

describe('WtRoundedAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtRoundedAction, {
			props: {
				icon: 'call',
			},
		});
		expect(wrapper.classes('wt-rounded-action')).toBe(true);
	});

	it('applies state classes from props', () => {
		const wrapper = shallowMount(WtRoundedAction, {
			props: {
				icon: 'call',
				active: true,
				disabled: true,
				rounded: true,
				wide: true,
				size: 'sm',
			},
		});

		expect(wrapper.classes()).toEqual(
			expect.arrayContaining([
				'wt-rounded-action--active',
				'wt-rounded-action--disabled',
				'wt-rounded-action--rounded',
				'wt-rounded-action--wide',
				'wt-rounded-action--size-sm',
			]),
		);
	});

	it('emits click event', async () => {
		const wrapper = shallowMount(WtRoundedAction, {
			props: {
				icon: 'call',
			},
		});

		await wrapper.trigger('click');
		expect(wrapper.emitted().click).toHaveLength(1);
	});

	it('shows loader when loading is true', () => {
		const wrapper = shallowMount(WtRoundedAction, {
			props: {
				icon: 'call',
				loading: true,
			},
		});

		expect(
			wrapper
				.findComponent({
					name: 'wt-loader',
				})
				.exists(),
		).toBe(true);
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon',
				})
				.exists(),
		).toBe(false);
	});

	it('hides loader 1s after loading becomes false', async () => {
		vi.useFakeTimers();
		const wrapper = shallowMount(WtRoundedAction, {
			props: {
				icon: 'call',
				loading: true,
			},
		});

		await wrapper.setProps({
			loading: false,
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-loader',
				})
				.exists(),
		).toBe(true);

		vi.advanceTimersByTime(1000);
		await wrapper.vm.$nextTick();

		expect(
			wrapper
				.findComponent({
					name: 'wt-loader',
				})
				.exists(),
		).toBe(false);
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon',
				})
				.exists(),
		).toBe(true);
		vi.useRealTimers();
	});
});
