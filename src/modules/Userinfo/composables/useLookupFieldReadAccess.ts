import { computed, type MaybeRefOrGetter, type Ref, toValue } from 'vue';

import type { WtObject } from '../../../enums';
import {
	getScopeClassByLookupPath,
	getWtObjectByScopeClass,
} from '../mappings/lookupPathToScopeClass';
import {
	normalizeLookupPath,
	peekTypeObjectClass,
} from '../scripts/typeObjectClass';
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

	const objectClass =
		field?.lookup?.objclass ||
		getScopeClassByLookupPath(path) ||
		peekTypeObjectClass(path);
	if (!objectClass) return false;

	const wtObject = getWtObjectByScopeClass(objectClass);
	return (
		userinfoStore?.().hasReadAccess(wtObject ?? (objectClass as WtObject)) ??
		false
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
