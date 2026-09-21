import type { WtObject } from '@webitel/ui-sdk/enums';
import { userinfoStore } from '@webitel/ui-sdk/src/modules/Userinfo/stores/userinfoStore';
import { computed } from 'vue';

export const hasFilterReadAccess = (object?: WtObject) =>
	userinfoStore?.().hasReadAccess(object) ?? false;

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

export const useFilterReadAccess = (object: WtObject) => {
	const hasReadAccess = computed(() => hasFilterReadAccess(object));

	const gateSearch = <T>(search: T) =>
		computed(() => (hasReadAccess.value ? search : undefined));

	return {
		hasReadAccess,
		gateSearch,
	};
};
