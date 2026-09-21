import { mount, shallowMount } from '@vue/test-utils';

import WtInputText from '../wt-input-text.vue';

describe('WtInputText', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtInputText);
		expect(wrapper.classes()).toContain('wt-input-text');
	});

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = shallowMount(WtInputText);
		expect(
			wrapper
				.findComponent({
					name: 'wt-label',
				})
				.exists(),
		).toBe(false);
	});

	it('renders the label text when passed', () => {
		const wrapper = mount(WtInputText, {
			props: {
				label: 'Name',
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe('Name');
	});

	it('does not trim the value on input', () => {
		const wrapper = mount(WtInputText);
		const input = wrapper.findComponent({
			name: 'InputText',
		});
		input.vm.$emit('update:model-value', '  hello  ');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			'  hello  ',
		]);
	});

	it('trims the value on blur by default', async () => {
		const wrapper = mount(WtInputText, {
			props: {
				modelValue: '  hello  ',
			},
		});
		const input = wrapper.findComponent({
			name: 'InputText',
		});
		await input.vm.$emit('blur', new Event('blur'));
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			'hello',
		]);
	});

	it('does not trim the value on blur when preventTrim is true', async () => {
		const wrapper = mount(WtInputText, {
			props: {
				modelValue: '  hello  ',
				preventTrim: true,
			},
		});
		const input = wrapper.findComponent({
			name: 'InputText',
		});
		await input.vm.$emit('blur', new Event('blur'));
		expect(wrapper.emitted()['update:modelValue']).toBeFalsy();
	});

	it('emits blur when the underlying input is blurred', async () => {
		const wrapper = mount(WtInputText);
		const input = wrapper.findComponent({
			name: 'InputText',
		});
		await input.vm.$emit('blur', new Event('blur'));
		expect(wrapper.emitted().blur).toBeTruthy();
	});

	it('toggles the eye icon and masks the input when hideInputValue is true', async () => {
		const wrapper = mount(WtInputText, {
			props: {
				hideInputValue: true,
				modelValue: 'secret',
			},
		});
		const input = wrapper.find('.wt-input-text__input');
		expect(input.classes()).toContain('wt-input-text__input--masked');

		await wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.trigger('click');
		expect(wrapper.find('.wt-input-text__input').classes()).not.toContain(
			'wt-input-text__input--masked',
		);
	});

	it('emits focus when the underlying input is focused', async () => {
		const wrapper = mount(WtInputText);
		const input = wrapper.findComponent({
			name: 'InputText',
		});
		await input.vm.$emit('focus', new Event('focus'));
		expect(wrapper.emitted().focus).toBeTruthy();
	});
});
