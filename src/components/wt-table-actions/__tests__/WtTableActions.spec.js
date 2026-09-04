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

	// NOTE: the settings icon-btn is nested inside <wt-badge v-if="isSettingsBadge">,
	// so it only renders (and can be clicked) when isSettingsBadge is true, even
	// though `icons` includes 'settings' independently. This looks like an accidental
	// regression (wt-badge supports a `hidden` prop for exactly this "always mount,
	// toggle visibility" case), but the tests assert current, not intended, behavior.
	it('emits input with "settings" when the settings icon is clicked, given isSettingsBadge is true', async () => {
		const wrapper = mount(WtTableActions, {
			props: {
				icons: [
					'settings',
				],
				isSettingsBadge: true,
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-icon-btn',
			})
			.trigger('click');
		expect(wrapper.emitted().input[0]).toEqual([
			'settings',
		]);
	});

	it('does not render the settings icon when isSettingsBadge is false, even if icons includes "settings"', () => {
		const wrapper = mount(WtTableActions, {
			props: {
				icons: [
					'settings',
				],
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.exists(),
		).toBe(false);
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

	it('marks the settings button active when isSettingsActive is true', () => {
		const wrapper = mount(WtTableActions, {
			props: {
				icons: [
					'settings',
				],
				isSettingsBadge: true,
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
