import { mount, shallowMount } from '@vue/test-utils';

import WtLabel from '../../wt-label/wt-label.vue';
import WtTextarea from '../wt-textarea.vue';

describe('WtTextarea', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTextarea, {
			stubs: {
				WtLabel,
			},
		});
		expect(wrapper.classes('wt-textarea')).toBe(true);
	});

	it('renders label text when passed', () => {
		const label = 'Hello there';
		const wrapper = mount(WtTextarea, {
			stubs: {
				WtLabel,
			},
			props: {
				label,
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe(label);
	});

	it('emits "Enter" event if autoresize prop is passed', () => {
		const wrapper = shallowMount(WtTextarea, {
			stubs: {
				WtLabel,
			},
			props: {
				autoresize: true,
			},
		});
		wrapper.find('.wt-textarea__textarea').trigger('keydown', {
			key: 'Enter',
		});
		expect(wrapper.emitted().enter).toBeTruthy();
	});

	it('do not emit "Enter" event if autoresize prop is not passed', () => {
		const wrapper = shallowMount(WtTextarea, {
			stubs: {
				WtLabel,
			},
		});
		wrapper.find('.wt-textarea__textarea').trigger('keydown', {
			key: 'Enter',
		});
		expect(wrapper.emitted().enter).toBeFalsy();
	});

	it('always emits keydown regardless of autoresize', () => {
		const wrapper = shallowMount(WtTextarea, {
			stubs: {
				WtLabel,
			},
		});
		wrapper.find('.wt-textarea__textarea').trigger('keydown', {
			key: 'a',
		});
		expect(wrapper.emitted().keydown).toBeTruthy();
	});

	it('does not emit enter for shift+Enter even with autoresize', () => {
		const wrapper = shallowMount(WtTextarea, {
			stubs: {
				WtLabel,
			},
			props: {
				autoresize: true,
			},
		});
		wrapper.find('.wt-textarea__textarea').trigger('keydown', {
			key: 'Enter',
			shiftKey: true,
		});
		expect(wrapper.emitted().enter).toBeFalsy();
	});

	it('emits paste and blur events', () => {
		const wrapper = shallowMount(WtTextarea, {
			stubs: {
				WtLabel,
			},
		});
		wrapper.find('.wt-textarea__textarea').trigger('paste');
		wrapper.find('.wt-textarea__textarea').trigger('blur');
		expect(wrapper.emitted().paste).toBeTruthy();
		expect(wrapper.emitted().blur).toBeTruthy();
	});

	it('does not render a label when no label prop or slot is passed', () => {
		const wrapper = shallowMount(WtTextarea, {
			stubs: {
				WtLabel,
			},
		});
		expect(wrapper.findComponent(WtLabel).exists()).toBe(false);
	});
});
