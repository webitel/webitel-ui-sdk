import { computed, type MaybeRefOrGetter, type Ref, toValue } from 'vue';

import type { WtObject } from '../../../enums';
import {
	getScopeClassByLookupPath,
	getWtObjectByScopeClass,
} from '../mappings/lookupPathToScopeClass';
import { normalizeLookupPath, peekTypeObjclass } from '../scripts/typeObjclass';
import { userinfoStore } from '../stores/userinfoStore';

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
	return (
		userinfoStore?.().hasReadAccess(wtObject ?? (objclass as WtObject)) ?? false
	);
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
