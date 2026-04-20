import { shallowMount } from '@vue/test-utils';

import WtInlineAddPanel from '../wt-inline-add-panel.vue';

describe('WtInlineAddPanel', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtInlineAddPanel);
		expect(wrapper.classes('wt-inline-add-panel')).toBe(true);
	});

	it('renders default direction class "row"', () => {
		const wrapper = shallowMount(WtInlineAddPanel);
		expect(wrapper.classes('wt-inline-add-panel--row')).toBe(true);
	});

	it('renders "column" direction class when direction prop is "column"', () => {
		const wrapper = shallowMount(WtInlineAddPanel, {
			props: {
				direction: 'column',
			},
		});
		expect(wrapper.classes('wt-inline-add-panel--column')).toBe(true);
	});

	it('renders content via default slot', () => {
		const content = 'slot content';
		const wrapper = shallowMount(WtInlineAddPanel, {
			slots: {
				default: content,
			},
		});
		expect(wrapper.text()).toContain(content);
	});

	it('emits "submit" on submit button click', async () => {
		const wrapper = shallowMount(WtInlineAddPanel);
		const buttons = wrapper.findAllComponents({
			name: 'WtButton',
		});
		await buttons[0].trigger('click');
		expect(wrapper.emitted('submit')).toBeTruthy();
	});

	it('emits "reset" on close button click', async () => {
		const wrapper = shallowMount(WtInlineAddPanel);
		const buttons = wrapper.findAllComponents({
			name: 'WtButton',
		});
		await buttons[1].trigger('click');
		expect(wrapper.emitted('reset')).toBeTruthy();
	});

	it('disables submit button when disabledAddAction is true', () => {
		const wrapper = shallowMount(WtInlineAddPanel, {
			props: {
				disabledAddAction: true,
			},
		});
		const submitButton = wrapper.findAllComponents({
			name: 'WtButton',
		})[0];
		expect(submitButton.props('disabled')).toBe(true);
	});

	it('emits "submit" on form submit', async () => {
		const wrapper = shallowMount(WtInlineAddPanel);
		await wrapper.find('form').trigger('submit');
		expect(wrapper.emitted('submit')).toBeTruthy();
	});
});
