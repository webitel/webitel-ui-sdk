import { flushPromises, mount, shallowMount } from '@vue/test-utils';

import WtConfirmDialog from '../wt-confirm-dialog.vue';

describe('WtConfirmDialog', () => {
	it('renders a component with the given title', () => {
		const wrapper = mount(WtConfirmDialog, {
			props: {
				title: 'Delete item?',
				callback: vi.fn(),
			},
		});
		expect(wrapper.classes()).toContain('wt-confirm-dialog');
		expect(wrapper.text()).toContain('Delete item?');
	});

	it('renders the custom delete message when provided', () => {
		const wrapper = mount(WtConfirmDialog, {
			props: {
				title: 'Delete item?',
				deleteMessage: 'Are you absolutely sure?',
				callback: vi.fn(),
			},
		});
		expect(wrapper.text()).toContain('Are you absolutely sure?');
	});

	it('emits close when the popup emits close', async () => {
		const wrapper = shallowMount(WtConfirmDialog, {
			props: {
				title: 'Delete item?',
				callback: vi.fn(),
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-popup',
			})
			.vm.$emit('close');
		expect(wrapper.emitted().close).toBeTruthy();
	});

	it('emits close when cancel action button is clicked', async () => {
		const wrapper = mount(WtConfirmDialog, {
			props: {
				title: 'Delete item?',
				callback: vi.fn(),
			},
		});
		const [cancelButton] = wrapper.findAllComponents({
			name: 'wt-button',
		});
		await cancelButton.trigger('click');
		expect(wrapper.emitted().close).toBeTruthy();
	});

	it('calls callback and emits close when confirm action button is clicked', async () => {
		const callback = vi.fn().mockResolvedValue();
		const wrapper = mount(WtConfirmDialog, {
			props: {
				title: 'Delete item?',
				callback,
			},
		});
		const [, confirmButton] = wrapper.findAllComponents({
			name: 'wt-button',
		});
		await confirmButton.trigger('click');
		await flushPromises();

		expect(callback).toHaveBeenCalled();
		expect(wrapper.emitted().close).toBeTruthy();
	});

	it('exposes isDeleting and confirm/close via the actions slot', () => {
		const callback = vi.fn().mockResolvedValue();
		const wrapper = mount(WtConfirmDialog, {
			props: {
				title: 'Delete item?',
				callback,
			},
			slots: {
				actions: `<template #actions="{ isDeleting, confirm, close }">
					<span class="slot-check">{{ typeof isDeleting }}-{{ typeof confirm }}-{{ typeof close }}</span>
				</template>`,
			},
		});
		expect(wrapper.find('.slot-check').text()).toBe(
			'boolean-function-function',
		);
	});
});
