import { computed, type MaybeRefOrGetter, type Ref, toValue } from 'vue';

import type { WtObject } from '../../../enums';
import {
	getScopeClassByLookupPath,
	getWtObjectByScopeClass,
} from '../mappings/lookupPathToScopeClass';
import { normalizeLookupPath, peekTypeObjclass } from '../scripts/typeObjclass';
import { hasReadAccessForWtObject } from '../stores/userinfoStore';

type LookupField = {
	lookup?: {
		path?: string;
		objclass?: string;
	};
};

export const hasLookupFieldReadAccess = (
	field?: LookupField | null,
): boolean => {
	const path = normalizeLookupPath(field?.lookup?.path);
	if (!path) return true;

	const objclass =
		field?.lookup?.objclass ||
		getScopeClassByLookupPath(path) ||
		peekTypeObjclass(path);
	if (!objclass) return false;

	const wtObject = getWtObjectByScopeClass(objclass);
	return hasReadAccessForWtObject(wtObject ?? (objclass as WtObject));
};

export const useLookupFieldReadAccess = (
	field: MaybeRefOrGetter<LookupField | null | undefined>,
): {
	hasReadAccess: Ref<boolean>;
} => {
	const hasReadAccess = computed(() =>
		hasLookupFieldReadAccess(toValue(field)),
	);

	return {
		hasReadAccess,
	};
};
