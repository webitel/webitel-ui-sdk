import { mount, shallowMount } from '@vue/test-utils';

import WtPagination from '../wt-pagination.vue';

describe('WtPagination', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders a component', () => {
		const wrapper = shallowMount(WtPagination);
		expect(wrapper.classes('wt-pagination')).toBe(true);
	});

	it('debounces size change event when debounce prop is true', async () => {
		const wrapper = shallowMount(WtPagination, {
			props: {
				size: '10',
				debounce: true,
				debounceDelay: 100,
			},
		});

		await wrapper.setProps({
			size: '20',
		});

		expect(wrapper.emitted().change).toBeFalsy();

		vi.advanceTimersByTime(1000);
		expect(wrapper.emitted().change ?? []).toHaveLength(1);
		expect(wrapper.emitted().change[0]).toEqual([
			20,
		]);
	});

	it('changes pages at icon btn click', async () => {
		const wrapper = mount(WtPagination, {
			props: {
				prev: true,
				next: true,
			},
		});
		const pageControls = wrapper.findAllComponents({
			name: 'wt-icon-btn',
		});

		pageControls[0].vm.$emit('click');
		pageControls[1].vm.$emit('click');

		expect(wrapper.emitted().prev.length).toBe(1);
		expect(wrapper.emitted().next.length).toBe(1);
	});

	it('resets to default size when input value is null', async () => {
		const wrapper = shallowMount(WtPagination, {
			props: {
				size: 25,
			},
		});

		wrapper.vm.inputHandler(null);
		expect(wrapper.vm.internalSize).toBeNull();

		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.internalSize).toBe(10);
		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input[0]).toEqual([
			10,
		]);
		expect(wrapper.emitted().change).toBeTruthy();
		expect(wrapper.emitted().change[0]).toEqual([
			10,
		]);
	});

	it('normalizes out-of-range input values to default size', async () => {
		const wrapper = shallowMount(WtPagination, {
			props: {
				size: 11,
			},
		});

		wrapper.vm.inputHandler(2000);
		wrapper.vm.inputHandler(-1);
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted().input).toEqual([
			[
				10,
			],
			[
				10,
			],
		]);
		expect(wrapper.emitted().change).toEqual([
			[
				10,
			],
		]);
	});
});
