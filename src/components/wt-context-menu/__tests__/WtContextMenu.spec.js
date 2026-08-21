import { flushPromises, mount, shallowMount } from '@vue/test-utils';

import WtPopover from '../../wt-popover/wt-popover.vue';
import WtContextMenu from '../wt-context-menu.vue';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

/**
 * wt-popover doesn't wire the `visible` prop through to PrimeVue's Popover — the
 * panel only opens via the activator slot's imperative `show()`. Since the panel
 * content is teleported to document.body, tests attach to the body and open it
 * through a real activator before asserting on the option list.
 */
const mountOpen = (props) => {
	const TestHost = {
		components: {
			WtContextMenu,
		},
		props: [
			'options',
			'disabled',
		],
		template: `
			<WtContextMenu ref="contextMenu" :options="options" :disabled="disabled">
				<template #activator="{ show }">
					<button class="opener" @click="show">open</button>
				</template>
			</WtContextMenu>
		`,
	};
	return mount(TestHost, {
		props,
		attachTo: document.body,
		global: {
			stubs: {
				WtPopover: false,
			},
			components: {
				WtPopover,
			},
		},
	});
};

describe('WtContextMenu', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtContextMenu, {
			props: {
				options: [],
			},
		});
		expect(wrapper.classes('wt-context-menu')).toBe(true);
	});

	it('renders an option for each entry once opened', async () => {
		const options = [
			{
				text: 'Option 1',
			},
			{
				text: 'Option 2',
			},
		];
		const wrapper = mountOpen({
			options,
		});
		await flushPromises();
		await wrapper.find('.opener').trigger('click');
		await flushPromises();

		const items = document.body.querySelectorAll('.wt-context-menu__option');
		expect(items.length).toBe(options.length);
		expect(items[0].textContent.trim()).toBe('Option 1');
		expect(items[1].textContent.trim()).toBe('Option 2');

		wrapper.unmount();
	});

	it('renders plain string options via their string value', async () => {
		const options = [
			'Foo',
			'Bar',
		];
		const wrapper = mountOpen({
			options,
		});
		await flushPromises();
		await wrapper.find('.opener').trigger('click');
		await flushPromises();

		const items = document.body.querySelectorAll('.wt-context-menu__option');
		expect(items[0].textContent.trim()).toBe('Foo');
		expect(items[1].textContent.trim()).toBe('Bar');

		wrapper.unmount();
	});

	it('emits click with the option and index when an option is clicked', async () => {
		const options = [
			{
				text: 'Option 1',
			},
			{
				text: 'Option 2',
			},
		];
		const wrapper = mountOpen({
			options,
		});
		await flushPromises();
		await wrapper.find('.opener').trigger('click');
		await flushPromises();

		document.body.querySelectorAll('.wt-context-menu__option')[1].click();
		await flushPromises();

		const contextMenu = wrapper.findComponent({
			ref: 'contextMenu',
		});
		expect(contextMenu.emitted().click[0]).toEqual([
			{
				option: options[1],
				index: 1,
			},
		]);

		wrapper.unmount();
	});

	it('applies the disabled modifier class to disabled options', async () => {
		const options = [
			{
				text: 'Option 1',
				disabled: true,
			},
			{
				text: 'Option 2',
			},
		];
		const wrapper = mountOpen({
			options,
		});
		await flushPromises();
		await wrapper.find('.opener').trigger('click');
		await flushPromises();

		const items = document.body.querySelectorAll('.wt-context-menu__option');
		expect(items[0].classList).toContain('wt-context-menu__option--disabled');
		expect(items[1].classList).not.toContain(
			'wt-context-menu__option--disabled',
		);

		wrapper.unmount();
	});
});
