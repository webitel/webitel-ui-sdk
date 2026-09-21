import type { WtObject } from '@webitel/ui-sdk/enums';
import { hasReadAccessForWtObject } from '@webitel/ui-sdk/modules/Userinfo';
import { computed } from 'vue';

export const hasFilterReadAccess = hasReadAccessForWtObject;

type SearchResult = {
	items?: unknown[];
	next?: boolean;
};

type GatedSearchResult = {
	items: unknown[];
	next?: boolean;
};

export const gateFilterSearch = <Args extends unknown[]>(
	object: WtObject,
	search: (...args: Args) => Promise<SearchResult>,
): ((...args: Args) => Promise<GatedSearchResult>) => {
	return async (...args) => {
		if (!hasFilterReadAccess(object)) {
			return {
				items: [],
			};
		}

		const result = await search(...args);
		return {
			...result,
			items: result.items ?? [],
		};
	};
};

export const useFilterReadAccess = (object: WtObject) => ({
	hasReadAccess: computed(() => hasFilterReadAccess(object)),
});
