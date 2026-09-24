import type { WtObject } from '@webitel/ui-sdk/enums';
import {
	type FilterHasReadAccess,
	injectFilterReadAccess,
} from '@webitel/ui-sdk/modules/Userinfo';
import { computed } from 'vue';

export type { FilterHasReadAccess };

type SearchResult<Item> = {
	items?: Item[];
	next?: boolean;
};

type GatedSearchResult<Item> = {
	items: Item[];
	next?: boolean;
};

export type GatedFilterSearch<Args extends unknown[], Item> = ((
	...args: Args
) => Promise<GatedSearchResult<Item>>) & {
	accessObject: WtObject;
};

export const gateFilterSearch = <Item, Args extends unknown[]>(
	object: WtObject,
	search: (...args: Args) => Promise<SearchResult<Item>>,
): GatedFilterSearch<Args, Item> => {
	const gated = (async (...args) => {
		const result = await search(...args);
		return {
			...result,
			items: result.items ?? [],
		};
	}) as GatedFilterSearch<Args, Item>;

	// preview has no WtObject of its own and checks Read against this tag
	gated.accessObject = object;
	return gated;
};

export const useFilterReadAccess = (object: WtObject) => {
	const getHasReadAccess = injectFilterReadAccess();

	const hasReadAccess = computed(() => getHasReadAccess()?.(object) ?? false);

	const gateSearch = <T>(search: T) =>
		computed(() => (hasReadAccess.value ? search : undefined));

	return {
		hasReadAccess,
		gateSearch,
	};
};
