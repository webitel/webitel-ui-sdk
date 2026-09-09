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

	it('trims the value by default on input', () => {
		const wrapper = mount(WtInputText);
		const input = wrapper.findComponent({
			name: 'InputText',
		});
		input.vm.$emit('update:model-value', '  hello  ');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			'hello',
		]);
	});

	it('does not trim the value when preventTrim is true', () => {
		const wrapper = mount(WtInputText, {
			props: {
				preventTrim: true,
			},
		});
		const input = wrapper.findComponent({
			name: 'InputText',
		});
		input.vm.$emit('update:model-value', '  hello  ');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			'  hello  ',
		]);
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

	/*
	  Key events must stay declared emits rather than ride along on `$attrs`:
	  an app running @vue/compat in MODE 2 gets vue 2's `$attrs`, which carries
	  no listeners, and a consumer's handler would never reach the input.
	  wt-multi-select commits custom values through `@keydown.enter` here.
	*/
	it.each([
		'keydown',
		'keyup',
	])('re-emits %s from the underlying input', async (event) => {
		const wrapper = mount(WtInputText);
		const native = new KeyboardEvent(event, {
			key: 'Enter',
		});

		await wrapper.find('input').element.dispatchEvent(native);

		expect(wrapper.emitted()[event]).toHaveLength(1);
		expect(wrapper.emitted()[event][0]).toEqual([
			native,
		]);
	});
});
