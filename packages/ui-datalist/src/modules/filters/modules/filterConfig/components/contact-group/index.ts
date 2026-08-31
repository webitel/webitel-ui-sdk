import { ContactGroupsAPI as contactGroups } from '@webitel/api-services/api';

import {
	type FilterConfigBaseParams,
	type FilterConfigSearchFilterContext,
	type FilterConfigSearchRequestParams,
	type IWtSysTypeFilterConfig,
	WtSysTypeFilterConfig,
} from '../../classes/FilterConfig';
import { FilterOption } from '../../enums/FilterOption';
import ContactGroupFilterValueField from './contact-group-filter-value-field.vue';
import ContactGroupFilterValuePreview from './contact-group-filter-value-preview.vue';

class ContactGroupFilterConfig extends WtSysTypeFilterConfig {
	readonly name = FilterOption.ContactGroup;
	valueInputComponent = ContactGroupFilterValueField;
	valuePreviewComponent = ContactGroupFilterValuePreview;
	hideUnassigned?: boolean;

	constructor(
		params: FilterConfigBaseParams & {
			hideUnassigned?: boolean;
		} = {},
	) {
		super(params);
		if ('hideUnassigned' in params) {
			this.hideUnassigned = params.hideUnassigned;
		}
	}

	searchRecords(
		params: FilterConfigSearchRequestParams,
		{ filterValue }: FilterConfigSearchFilterContext = {},
	): Promise<{
		items: unknown[];
		next?: boolean;
	}> {
		const id = params.id?.list?.length
			? params.id?.list
			: params.id || filterValue?.list;
		// params.id?.list /* general logic from dynamic-filter-preview.vue*/
		// params.id /* wt-select options loadings */
		// filterValue?.list; /* newest and coolest, but not implemented on all filters 🥲 */

		// This endpoint uses `limit = size + 1`, so the preview's `size: -1`
		// becomes `limit: 0` and returns nothing. Request as many records as
		// there are ids instead.
		const idsCount = Array.isArray(id) ? id.length : 10;
		const size = idsCount || params.size;

		return contactGroups.getLookup({
			...params,
			id,
			size,
			type: 'STATIC',
		});
	}
}

export const createContactGroupFilterConfig = (
	params?: FilterConfigBaseParams & {
		hideUnassigned?: boolean;
	},
) => new ContactGroupFilterConfig(params);

export interface IContactGroupFilterConfig extends IWtSysTypeFilterConfig {
	hideUnassigned?: boolean;
}
