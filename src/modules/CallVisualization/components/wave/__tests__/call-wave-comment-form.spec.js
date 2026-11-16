import { shallowMount } from '@vue/test-utils';

import CommentForm from '../call-wave-comment-form.vue';

const props = {
	callDuration: 10,
};

const draft = {
	note: 'note',
	startSec: 1,
	endSec: 2,
};

const WtPopupStub = {
	name: 'wt-popup',
	emits: [
		'close',
	],
	template:
		'<div><slot name="title" /><slot name="main" /><slot name="actions" /></div>',
};

const mountForm = (comment) =>
	shallowMount(CommentForm, {
		props: {
			...props,
			comment,
		},
		global: {
			stubs: {
				WtPopup: WtPopupStub,
			},
		},
	});

const findButtons = (wrapper) =>
	wrapper.findAllComponents({
		name: 'wt-button',
	});

describe('Opened call comment form', () => {
	it('should render a component', () => {
		const wrapper = mountForm(draft);
		expect(wrapper.classes('call-wave-comment-form')).toBe(true);
	});

	it('should emit draft data on add', () => {
		const wrapper = mountForm(draft);
		findButtons(wrapper)[0].vm.$emit('click');
		expect(wrapper.emitted().save[0][0]).toEqual(draft);
	});

	it('should emit close event on cancel', () => {
		const wrapper = mountForm(draft);
		findButtons(wrapper)[1].vm.$emit('click');
		expect(wrapper.emitted().close).toBeTruthy();
	});

	it('should emit close event on popup close', () => {
		const wrapper = mountForm(draft);
		wrapper
			.findComponent({
				name: 'wt-popup',
			})
			.vm.$emit('close');
		expect(wrapper.emitted().close).toBeTruthy();
	});

	it('should disable add button when note text is empty', () => {
		const wrapper = mountForm({
			...draft,
			note: '',
		});
		expect(findButtons(wrapper)[0].attributes('disabled')).toBe('true');
	});
});
