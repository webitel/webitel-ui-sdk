import { computed } from 'vue';

import type { WtObject } from '@webitel/ui-sdk/enums';
import { hasReadAccessForWtObject } from '@webitel/ui-sdk/modules/Userinfo';

export const hasFilterReadAccess = hasReadAccessForWtObject;

export const gateFilterSearch = (
	object: WtObject,
	search: (...args: unknown[]) => Promise<{
		items?: unknown[];
	}>,
) => {
	return (...args: unknown[]) => {
		if (!hasFilterReadAccess(object)) {
			return Promise.resolve({
				items: [],
			});
		}

		return search(...args);
	};
};

export const useFilterReadAccess = (object: WtObject) => ({
	hasReadAccess: computed(() => hasFilterReadAccess(object)),
});
