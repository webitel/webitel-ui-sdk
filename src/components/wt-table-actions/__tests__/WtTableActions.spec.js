import { mount, shallowMount } from '@vue/test-utils';

import WtTableActions from '../wt-table-actions.vue';

describe('WtTableActions', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTableActions);
		expect(wrapper.classes('wt-table-actions')).toBe(true);
	});

	it('renders only the refresh icon by default', () => {
		const wrapper = shallowMount(WtTableActions);
		expect(
			wrapper.findAllComponents({
				name: 'wt-icon-btn',
			}).length,
		).toBe(1);
	});

	it('renders default slot content', () => {
		const wrapper = shallowMount(WtTableActions, {
			slots: {
				default: 'Custom action',
			},
		});
		expect(wrapper.text()).toContain('Custom action');
	});

	it.each([
		[
			'import',
			'import',
		],
		[
			'export',
			'export',
		],
		[
			'filter-reset',
			'filterReset',
		],
		[
			'column-select',
			'columnSelect',
		],
		[
			'refresh',
			'refresh',
		],
		[
			'settings',
			'settings',
		],
	])('emits input with "%s" when the %s icon is clicked', async (icon, emitted) => {
		const wrapper = mount(WtTableActions, {
			props: {
				icons: [
					icon,
				],
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.trigger('click');
		expect(wrapper.emitted().input[0]).toEqual([
			emitted,
		]);
	});

	it('renders multiple icons in the icons array', () => {
		const wrapper = shallowMount(WtTableActions, {
			props: {
				icons: [
					'import',
					'export',
					'refresh',
				],
			},
		});
		expect(
			wrapper.findAllComponents({
				name: 'wt-icon-btn',
			}).length,
		).toBe(3);
	});

	it('shows a visible badge on the settings button when isSettingsBadge is true', () => {
		const wrapper = shallowMount(WtTableActions, {
			props: {
				icons: [
					'settings',
				],
				isSettingsBadge: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-badge',
				})
				.props('hidden'),
		).toBe(false);
	});

	it('hides the settings badge by default', () => {
		const wrapper = shallowMount(WtTableActions, {
			props: {
				icons: [
					'settings',
				],
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-badge',
				})
				.props('hidden'),
		).toBe(true);
	});

	it('marks the settings button active when isSettingsActive is true', () => {
		const wrapper = mount(WtTableActions, {
			props: {
				icons: [
					'settings',
				],
				isSettingsActive: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.classes(),
		).toContain('active');
	});
});
