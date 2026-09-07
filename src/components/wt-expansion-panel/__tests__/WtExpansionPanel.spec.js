import { mount, shallowMount } from '@vue/test-utils';

import WtExpansionPanel from '../wt-expansion-panel.vue';

describe('WtExpansionPanel', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtExpansionPanel);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('renders title, default and actions slots', () => {
		const wrapper = mount(WtExpansionPanel, {
			slots: {
				title: 'Title content',
				default: 'Body content',
				actions: 'Actions content',
			},
		});
		expect(wrapper.find('.wt-expansion-panel-header').text()).toContain(
			'Title content',
		);
		expect(wrapper.find('.wt-expansion-panel-body').text()).toBe(
			'Body content',
		);
		expect(wrapper.text()).toContain('Actions content');
	});

	it('is open by default and emits "closed" on first click', async () => {
		const wrapper = shallowMount(WtExpansionPanel);
		await wrapper.find('.wt-expansion-panel-header').trigger('click');
		expect(wrapper.emitted().closed).toBeTruthy();
		expect(wrapper.emitted().opened).toBeFalsy();
	});

	it('emits "opened" on the second click after closing', async () => {
		const wrapper = shallowMount(WtExpansionPanel);
		await wrapper.find('.wt-expansion-panel-header').trigger('click');
		await wrapper.find('.wt-expansion-panel-header').trigger('click');
		expect(wrapper.emitted().opened).toBeTruthy();
	});

	it('starts collapsed when the collapsed prop is true', () => {
		const wrapper = shallowMount(WtExpansionPanel, {
			props: {
				collapsed: true,
			},
		});
		expect(wrapper.find('.wt-expansion-panel-arrow').classes()).not.toContain(
			'wt-expansion-panel-arrow--opened',
		);
	});

	it('applies the size modifier class', () => {
		const wrapper = shallowMount(WtExpansionPanel, {
			props: {
				size: 'sm',
			},
		});
		expect(wrapper.classes()).toContain('wt-expansion-panel--sm');
	});
});
