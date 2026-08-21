import { mount } from '@vue/test-utils';

import IconAction from '../../../enums/IconAction/IconAction.enum.js';
import WtActionBar from '../wt-action-bar.vue';
import {
	sectionActionsOrder,
	tableActionsOrder,
} from '../WtActionBarActionsOrder.js';

describe('WtActionBar', () => {
	it('renders a component', () => {
		const wrapper = mount(WtActionBar);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders table actions by default', () => {
		const wrapper = mount(WtActionBar);
		const actions = wrapper.findAllComponents({
			name: 'wt-icon-action',
		});
		expect(actions.length).toBe(tableActionsOrder.length);
	});

	it('renders section actions when mode is "section"', () => {
		const wrapper = mount(WtActionBar, {
			props: {
				mode: 'section',
			},
		});
		const actions = wrapper.findAllComponents({
			name: 'wt-icon-action',
		});
		expect(actions.length).toBe(sectionActionsOrder.length);
	});

	it('renders only actions listed in include', () => {
		const included = [
			tableActionsOrder[0],
		];
		const wrapper = mount(WtActionBar, {
			props: {
				include: included,
			},
		});
		const actions = wrapper.findAllComponents({
			name: 'wt-icon-action',
		});
		expect(actions.length).toBe(included.length);
		expect(actions[0].props('action')).toBe(included[0]);
	});

	it('excludes actions listed in exclude', () => {
		const excluded = tableActionsOrder[0];
		const wrapper = mount(WtActionBar, {
			props: {
				exclude: [
					excluded,
				],
			},
		});
		const actions = wrapper.findAllComponents({
			name: 'wt-icon-action',
		});
		expect(actions.length).toBe(tableActionsOrder.length - 1);
		expect(actions.some((a) => a.props('action') === excluded)).toBe(false);
	});

	it('emits click:[action] when an action is clicked', async () => {
		const action = tableActionsOrder[0];
		const wrapper = mount(WtActionBar, {
			props: {
				include: [
					action,
				],
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-icon-action',
			})
			.trigger('click');
		expect(wrapper.emitted(`click:${action}`)).toBeTruthy();
	});

	it('disables an action via disabled:[action] prop', () => {
		const action = IconAction.SORT;
		const wrapper = mount(WtActionBar, {
			props: {
				include: [
					action,
				],
				[`disabled:${action}`]: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-action',
				})
				.props('disabled'),
		).toBe(true);
	});

	it('passes sort:order prop to sort action', () => {
		const wrapper = mount(WtActionBar, {
			props: {
				include: [
					IconAction.SORT,
				],
				'sort:order': 'asc',
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-action',
				})
				.props('sort:order'),
		).toBe('asc');
	});
});
