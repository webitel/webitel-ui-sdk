import { shallowMount } from '@vue/test-utils';

import { ComponentSize } from '../../../enums';
import WtDualPanel from '../wt-dual-panel.vue';

describe('WtDualPanel', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtDualPanel);
		expect(wrapper.classes('wt-dual-panel')).toBe(true);
	});

	it('renders dual panel header via header slot', () => {
		const content = 'Dual Panel header';
		const wrapper = shallowMount(WtDualPanel, {
			slots: {
				header: content,
			},
		});
		expect(wrapper.find('.wt-dual-panel__header').text()).toBe(content);
	});

	it('does not render the header when hideHeader is true', () => {
		const wrapper = shallowMount(WtDualPanel, {
			props: {
				hideHeader: true,
			},
		});
		expect(wrapper.find('.wt-dual-panel__header').exists()).toBe(false);
	});

	it('renders dual panel actions panel via actions panel slot when actionsPanel prop is true', () => {
		const content = 'Dual Panel actions panel content';
		const wrapper = shallowMount(WtDualPanel, {
			props: {
				actionsPanel: true,
			},
			slots: {
				'actions-panel': content,
			},
		});
		expect(wrapper.find('.wt-dual-panel__actions-panel').text()).toBe(content);
	});

	it('does not render actions panel when actionsPanel prop is false', () => {
		const wrapper = shallowMount(WtDualPanel, {
			props: {
				actionsPanel: false,
			},
		});
		expect(wrapper.find('.wt-dual-panel__actions-panel').exists()).toBe(false);
	});

	it('renders dual panel side panel via side-panel slot', () => {
		const content = 'Dual Panel side panel';
		const wrapper = shallowMount(WtDualPanel, {
			slots: {
				'side-panel': content,
			},
		});
		expect(wrapper.find('.wt-dual-panel__side-panel').text()).toBe(content);
	});

	it('renders dual panel main content via main slot', () => {
		const content = 'Dual Panel main panel';
		const wrapper = shallowMount(WtDualPanel, {
			slots: {
				main: content,
			},
		});
		expect(wrapper.find('.wt-dual-panel__main').text()).toBe(content);
	});

	it('renders the resize icon action by default', () => {
		const wrapper = shallowMount(WtDualPanel);
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-action',
				})
				.exists(),
		).toBe(true);
	});

	it('does not render the resize icon action when disableResize is true', () => {
		const wrapper = shallowMount(WtDualPanel, {
			props: {
				disableResize: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-action',
				})
				.exists(),
		).toBe(false);
	});

	it('collapses the side panel and emits the new size when the resize action is clicked', async () => {
		const content = 'side content';
		const wrapper = shallowMount(WtDualPanel, {
			slots: {
				'side-panel': content,
			},
		});
		expect(wrapper.find('.wt-dual-panel__side-panel--md').exists()).toBe(true);

		await wrapper
			.findComponent({
				name: 'wt-icon-action',
			})
			.vm.$emit('click');

		expect(wrapper.find('.wt-dual-panel__side-panel--sm').exists()).toBe(true);
		expect(wrapper.text()).not.toContain(content);
		expect(wrapper.emitted()['update:side-panel-size'][0]).toEqual([
			ComponentSize.SM,
		]);
	});
});
