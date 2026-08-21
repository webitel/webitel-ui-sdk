import { mount, shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

import { useValidation } from '../../../mixins/validationMixin/useValidation';
import WtSearchBar from '../wt-search-bar.vue';

vi.mock('../../../mixins/validationMixin/useValidation');
useValidation.mockImplementation(() => ({
	isValidation: ref(false),
	invalid: ref(false),
	validationText: ref(''),
}));

describe('WtSearchBar', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('renders a component', () => {
		const wrapper = shallowMount(WtSearchBar, {
			stubs: {
				WtIcon: true,
				WtIconBtn: true,
			},
		});
		expect(wrapper.classes('wt-search-bar')).toBe(true);
	});

	it('emits input immediately and search after the debounce delay', () => {
		const wrapper = shallowMount(WtSearchBar, {
			stubs: {
				WtIcon: true,
				WtIconBtn: true,
			},
		});
		const input = wrapper.findComponent({
			name: 'wt-input-text',
		});
		input.vm.$emit('update:model-value', 'val');

		expect(wrapper.emitted().input[0]).toEqual([
			'val',
		]);
		expect(wrapper.emitted().search).toBeFalsy();

		vi.advanceTimersByTime(1000);
		expect(wrapper.emitted().search[0]).toEqual([
			'val',
		]);
	});

	it('does not render the suffix controls without a value, hint or searchMode', () => {
		const wrapper = shallowMount(WtSearchBar, {
			stubs: {
				WtIcon: true,
				WtIconBtn: true,
			},
		});
		expect(wrapper.find('.wt-search-bar__icon-controls').exists()).toBe(false);
	});

	it('renders a reset button that clears the value when a value is present', async () => {
		const wrapper = mount(WtSearchBar, {
			props: {
				value: 'something',
			},
		});
		const resetBtn = wrapper.find('.wt-search-bar__reset-icon-btn');
		expect(resetBtn.exists()).toBe(true);

		await resetBtn.trigger('click');
		expect(wrapper.emitted().input.at(-1)).toEqual([
			'',
		]);
	});

	it('emits search on Enter keyup once the debounce delay elapses', async () => {
		const wrapper = mount(WtSearchBar, {
			props: {
				value: 'enter-value',
			},
		});
		const nativeInput = wrapper.find('input');
		nativeInput.element.value = 'enter-value';
		await nativeInput.trigger('keyup', {
			key: 'Enter',
		});

		expect(wrapper.emitted().search).toBeFalsy();

		vi.advanceTimersByTime(1000);
		expect(wrapper.emitted().search[0]).toEqual([
			'enter-value',
		]);
	});

	it('emits focus when the underlying input is focused', async () => {
		const wrapper = mount(WtSearchBar);
		await wrapper.find('input').trigger('focus');
		expect(wrapper.emitted().focus).toBeTruthy();
	});
});
