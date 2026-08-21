import { flushPromises, mount } from '@vue/test-utils';

import WtPopover from '../wt-popover.vue';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

describe('WtPopover', () => {
	it('renders a component', () => {
		const wrapper = mount(WtPopover);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders the activator slot content', () => {
		const wrapper = mount(WtPopover, {
			slots: {
				activator: '<button class="opener">open</button>',
			},
		});
		expect(wrapper.find('.opener').exists()).toBe(true);
	});

	it('opens the panel when show() is called via the activator slot', async () => {
		const wrapper = mount(WtPopover, {
			attachTo: document.body,
			slots: {
				activator: `<template #activator="{ show }"><button class="opener" @click="show">open</button></template>`,
				default: 'Popover content',
			},
		});
		await flushPromises();

		expect(document.body.textContent).not.toContain('Popover content');

		await wrapper.find('.opener').trigger('click');
		await flushPromises();

		expect(document.body.textContent).toContain('Popover content');

		wrapper.unmount();
	});

	it('does not open when disabled is true', async () => {
		const wrapper = mount(WtPopover, {
			attachTo: document.body,
			props: {
				disabled: true,
			},
			slots: {
				activator: `<template #activator="{ show }"><button class="opener" @click="show">open</button></template>`,
				default: 'Popover content',
			},
		});
		await flushPromises();

		await wrapper.find('.opener').trigger('click');
		await flushPromises();

		expect(document.body.textContent).not.toContain('Popover content');

		wrapper.unmount();
	});

	it('exposes show, hide and toggle methods', () => {
		const wrapper = mount(WtPopover);
		expect(typeof wrapper.vm.show).toBe('function');
		expect(typeof wrapper.vm.hide).toBe('function');
		expect(typeof wrapper.vm.toggle).toBe('function');
	});
});
