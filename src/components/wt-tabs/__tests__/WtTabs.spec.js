import { shallowMount } from '@vue/test-utils';

import WtTabs from '../wt-tabs.vue';

const tabs = [
	{
		value: 'tab1',
		text: 'default',
	},
];
const disabledTabs = [
	{
		value: 'enabled',
		text: 'Enabled',
	},
	{
		value: 'disabled',
		text: 'Disabled',
		disabled: true,
	},
];
describe('WtTabs', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTabs);
		expect(wrapper.classes('wt-tabs')).toBe(true);
	});

	it('component emits change at tab click', () => {
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs,
			},
		});
		wrapper.find('.wt-tab').trigger('click');
		expect(wrapper.emitted().change.pop()).toEqual([
			tabs[0],
		]);
	});

	it('renders tab default content', () => {
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs,
			},
		});
		expect(wrapper.find('.wt-tab').text()).toBe(tabs[0].text);
	});

	it('renders tab custom content via default slot', () => {
		const custom = 'custom name';
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs,
			},
			slots: {
				tab1: custom,
			},
		});
		expect(wrapper.find('.wt-tab').text()).toBe(custom);
	});

	it('highlights the tab matching current.value', () => {
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs,
				current: {
					value: 'tab1',
				},
			},
		});
		expect(wrapper.find('.wt-tab').classes()).toContain('wt-tab--highlight');
	});

	it('does not highlight when current does not match any tab', () => {
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs,
				current: {
					value: 'other',
				},
			},
		});
		expect(wrapper.find('.wt-tab').classes()).not.toContain(
			'wt-tab--highlight',
		);
	});

	it('applies the wide modifier class', () => {
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs,
				wide: true,
			},
		});
		expect(wrapper.classes()).toContain('wt-tabs--wide');
	});

	it('renders the disabled attribute and wt-tab--disabled on a disabled tab', () => {
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs: disabledTabs,
			},
		});
		const disabledTab = wrapper.findAll('.wt-tab')[1];
		expect(disabledTab.classes()).toContain('wt-tab--disabled');
		expect(disabledTab.attributes('disabled')).toBeDefined();
	});

	it('does not emit change when a disabled tab is clicked', () => {
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs: disabledTabs,
			},
		});
		wrapper.findAll('.wt-tab')[1].trigger('click');
		expect(wrapper.emitted().change).toBeUndefined();
	});

	it('still emits change for enabled tabs in a list with disabled tabs', () => {
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs: disabledTabs,
			},
		});
		wrapper.findAll('.wt-tab')[0].trigger('click');
		expect(wrapper.emitted().change.pop()).toEqual([
			disabledTabs[0],
		]);
	});

	it('renders a button for every tab', () => {
		const multiTabs = [
			{
				value: 'a',
				text: 'A',
			},
			{
				value: 'b',
				text: 'B',
			},
		];
		const wrapper = shallowMount(WtTabs, {
			props: {
				tabs: multiTabs,
			},
		});
		expect(wrapper.findAll('.wt-tab').length).toBe(multiTabs.length);
	});
});
