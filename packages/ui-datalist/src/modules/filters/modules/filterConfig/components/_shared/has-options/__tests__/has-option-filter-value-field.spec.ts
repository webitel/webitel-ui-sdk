import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { createFilterConfig } from '../../../../classes/createFilterConfig';
import { FilterOption } from '../../../../enums/FilterOption';
import HasOptionFilterValueField from '../has-option-filter-value-field.vue';

describe('HasOptionFilterValueField label', () => {
	it('renders a name-based label by default (static-filter-field no longer forces hideLabel)', () => {
		const filterConfig = createFilterConfig({
			name: FilterOption.Rated,
			showFilterName: true,
		});

		const wrapper = mount(HasOptionFilterValueField, {
			props: {
				filterConfig,
			},
		});

		expect(wrapper.find('.wt-select__label').exists()).toBe(true);
		expect(wrapper.find('.wt-select__label').text()).toContain('Rated');
	});

	it('still respects an explicit hideLabel', () => {
		const filterConfig = createFilterConfig({
			name: FilterOption.Rated,
			showFilterName: true,
		});

		const wrapper = mount(HasOptionFilterValueField, {
			props: {
				filterConfig,
				hideLabel: true,
			},
		});

		expect(wrapper.find('.wt-select__label').exists()).toBe(false);
	});
});
