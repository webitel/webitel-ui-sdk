import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { createFilterConfig } from '../../../classes/createFilterConfig';
import { FilterOption } from '../../../enums/FilterOption';
import RatedByFilterValueField from '../rated-by-filter-value-field.vue';

vi.mock('@webitel/api-services/api', async (importOriginal) => ({
	...(await importOriginal()),
	UsersAPI: {
		getLookup: vi.fn(() =>
			Promise.resolve({
				items: [],
				next: false,
			}),
		),
	},
}));

describe('RatedByFilterValueField label', () => {
	it('shows the filter name, not the generic "Value" text, when showFilterName is set', () => {
		const filterConfig = createFilterConfig({
			name: FilterOption.RatedBy,
			showFilterName: true,
		});

		const wrapper = mount(RatedByFilterValueField, {
			props: {
				filterConfig,
			},
		});

		expect(wrapper.find('.wt-select__label').text()).not.toBe('Value');
	});
});
