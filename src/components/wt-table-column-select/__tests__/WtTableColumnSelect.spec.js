import { mount, shallowMount } from '@vue/test-utils';

import WtTableColumnSelect from '../wt-table-column-select.vue';

describe('WtTableColumnSelect', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTableColumnSelect, {
			props: {
				headers: [],
			},
		});
		expect(wrapper.classes('wt-table-column-select')).toBe(true);
	});
	it('column select popup is invisible by default', () => {
		const wrapper = mount(WtTableColumnSelect, {
			props: {
				headers: [],
			},
		});
		expect(wrapper.find('.wt-popup__popup').exists()).toBe(false);
	});
	it('column select popup is opening by icon-btn click', async () => {
		const wrapper = mount(WtTableColumnSelect, {
			props: {
				headers: [],
			},
		});
		wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.vm.$emit('click');
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.wt-popup__popup').exists()).toBe(true);
	});

	it('renders a checkbox for each non-static header once opened', async () => {
		const headers = [
			{
				value: 'name',
				text: 'Name',
				show: true,
			},
			{
				value: 'age',
				text: 'Age',
				show: false,
			},
		];
		const wrapper = mount(WtTableColumnSelect, {
			props: {
				headers,
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.vm.$emit('click');
		await wrapper.vm.$nextTick();

		const checkboxes = wrapper.findAllComponents({
			name: 'wt-checkbox',
		});
		expect(checkboxes.length).toBe(2);
	});

	it('excludes staticHeaders from the changeable list', async () => {
		const headers = [
			{
				value: 'name',
				text: 'Name',
				show: true,
			},
			{
				value: 'id',
				text: 'ID',
				show: true,
			},
		];
		const wrapper = mount(WtTableColumnSelect, {
			props: {
				headers,
				staticHeaders: [
					'id',
				],
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.vm.$emit('click');
		await wrapper.vm.$nextTick();

		expect(
			wrapper.findAllComponents({
				name: 'wt-checkbox',
			}).length,
		).toBe(1);
	});

	it('shows an empty state when there are no changeable headers', async () => {
		const wrapper = mount(WtTableColumnSelect, {
			props: {
				headers: [],
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.vm.$emit('click');
		await wrapper.vm.$nextTick();

		expect(
			wrapper
				.findComponent({
					name: 'wt-empty',
				})
				.exists(),
		).toBe(true);
	});

	it('emits change with the draft headers and closes when "Add" is clicked', async () => {
		const headers = [
			{
				value: 'name',
				text: 'Name',
				show: true,
			},
		];
		const wrapper = mount(WtTableColumnSelect, {
			props: {
				headers,
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.vm.$emit('click');
		await wrapper.vm.$nextTick();

		const [addButton] = wrapper.findAllComponents({
			name: 'wt-button',
		});
		await addButton.trigger('click');

		expect(wrapper.emitted().change).toBeTruthy();
		expect(wrapper.emitted().change[0][0]).toEqual(headers);
		expect(wrapper.find('.wt-popup__popup').exists()).toBe(false);
	});

	it('closes without emitting change when "Cancel" is clicked', async () => {
		const headers = [
			{
				value: 'name',
				text: 'Name',
				show: true,
			},
		];
		const wrapper = mount(WtTableColumnSelect, {
			props: {
				headers,
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.vm.$emit('click');
		await wrapper.vm.$nextTick();

		const [, cancelButton] = wrapper.findAllComponents({
			name: 'wt-button',
		});
		await cancelButton.trigger('click');

		expect(wrapper.emitted().change).toBeFalsy();
		expect(wrapper.find('.wt-popup__popup').exists()).toBe(false);
	});
});
