import { flushPromises, mount, shallowMount } from '@vue/test-utils';

import WtTableActions from '../../wt-table-actions/wt-table-actions.vue';
import FiltersPanelWrapper from '../wt-filters-panel-wrapper.vue';

const mountWithTableActions = (options) =>
	mount(FiltersPanelWrapper, {
		...options,
		global: {
			...options?.global,
			stubs: {
				WtTableActions: false,
				...options?.global?.stubs,
			},
			components: {
				WtTableActions,
				...options?.global?.components,
			},
		},
	});

describe('Filters Panel Wrapper', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(FiltersPanelWrapper);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders default slot content in the filters wrap', () => {
		const wrapper = shallowMount(FiltersPanelWrapper, {
			slots: {
				default: 'Filter fields',
			},
		});
		expect(wrapper.find('.filters-wrap').text()).toBe('Filter fields');
	});

	it('emits "reset" event when wt-table-actions emits input with "filterReset"', async () => {
		const wrapper = mountWithTableActions();
		await flushPromises();
		await wrapper
			.findComponent({
				name: 'wt-table-actions',
			})
			.vm.$emit('input', 'filterReset');
		expect(wrapper.emitted().reset).toBeTruthy();
	});

	// NOTE: the "opened" class is bound to the `isOpened` prop in the template, but
	// toggleFiltersExpansion (triggered by the "settings" table action) mutates the
	// separate `localIsOpened` data property, which nothing reads. So this handler
	// currently has no visible effect on the rendered class — asserting that as the
	// actual current behavior rather than the presumably-intended toggle.
	it('does not change "filters-panel-wrapper--opened" class when wt-table-actions emits input with "settings"', async () => {
		const wrapper = mountWithTableActions();
		await flushPromises();
		expect(wrapper.classes()).not.toContain('filters-panel-wrapper--opened');

		await wrapper
			.findComponent({
				name: 'wt-table-actions',
			})
			.vm.$emit('input', 'settings');
		expect(wrapper.classes()).not.toContain('filters-panel-wrapper--opened');
	});

	it('starts opened when isOpened prop is true', () => {
		const wrapper = shallowMount(FiltersPanelWrapper, {
			props: {
				isOpened: true,
			},
		});
		expect(wrapper.classes()).toContain('filters-panel-wrapper--opened');
	});

	it('passes tableActionIcons down to wt-table-actions', async () => {
		const icons = [
			'filter-reset',
		];
		const wrapper = mountWithTableActions({
			props: {
				tableActionIcons: icons,
			},
		});
		await flushPromises();
		expect(
			wrapper
				.findComponent({
					name: 'wt-table-actions',
				})
				.props('icons'),
		).toEqual(icons);
	});
});
