import { mount, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import WtTableVariableColumnSelect from '../wt-table-variable-column-select.vue';

const storageKey = 'test/variable-headers';

const mountSelect = (
	props: Partial<{
		storageKey: string;
		title: string;
	}> = {},
) =>
	mount(WtTableVariableColumnSelect, {
		props: {
			storageKey,
			title: 'Select variables',
			...props,
		},
		global: {
			stubs: {
				WtBadge: {
					template: '<div><slot /></div>',
				},
				WtIconBtn: true,
				WtPopup: {
					props: [
						'shown',
						'size',
					],
					template:
						'<div v-if="shown" class="wt-popup__popup"><slot name="title" /><slot name="main" /><slot name="actions" /></div>',
				},
				WtInputText: true,
				WtButton: {
					props: [
						'disabled',
						'loading',
						'color',
					],
					template:
						'<button :disabled="disabled" @click="$attrs.onClick?.() || $emit(\'click\')"><slot /></button>',
				},
			},
		},
	});

describe('WtTableVariableColumnSelect', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('renders a component', () => {
		const wrapper = shallowMount(WtTableVariableColumnSelect, {
			props: {
				storageKey,
				title: 'Select variables',
			},
		});
		expect(wrapper.classes('wt-table-variable-column-select')).toBe(true);
	});

	it('opens popup on icon click', async () => {
		const wrapper = mountSelect();
		expect(wrapper.find('.wt-popup__popup').exists()).toBe(false);

		wrapper
			.findComponent({
				name: 'WtIconBtn',
			})
			.vm.$emit('click');
		await nextTick();

		expect(wrapper.find('.wt-popup__popup').exists()).toBe(true);
	});

	it('restores keys from localStorage and emits update:variable-headers', async () => {
		localStorage.setItem(storageKey, 'foo;bar');

		const wrapper = mountSelect();
		await nextTick();

		const emitted = wrapper.emitted('update:variable-headers');
		expect(emitted).toBeTruthy();
		expect(emitted?.[0]?.[0]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					field: 'variables.foo',
					text: 'foo',
					show: false,
				}),
				expect.objectContaining({
					field: 'variables.bar',
					text: 'bar',
					show: false,
				}),
			]),
		);
	});
});
