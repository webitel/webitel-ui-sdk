import { computed, type MaybeRefOrGetter, type Ref, toValue } from 'vue';

import type { WtObject } from '../../../enums';
import { injectFilterReadAccess } from '../injection/filterReadAccess';
import {
	getScopeClassByLookupPath,
	getWtObjectByScopeClass,
} from '../mappings/lookupPathToScopeClass';
import {
	normalizeLookupPath,
	peekTypeObjectClass,
} from '../scripts/typeObjectClass';

export type LookupFieldHasReadAccess = (object?: WtObject) => boolean;

type LookupField = {
	lookup?: {
		path?: string;
		objclass?: string;
	};
};

export const hasLookupFieldReadAccess = (
	field?: LookupField | null,
	hasReadAccess?: LookupFieldHasReadAccess,
): boolean => {
	const path = normalizeLookupPath(field?.lookup?.path);
	if (!path) return true;

	const objectClass =
		field?.lookup?.objclass ||
		getScopeClassByLookupPath(path) ||
		peekTypeObjectClass(path);
	if (!objectClass) return false;

	const wtObject = getWtObjectByScopeClass(objectClass);
	return hasReadAccess?.(wtObject ?? (objectClass as WtObject)) ?? false;
};

export const useLookupFieldReadAccess = (
	field: MaybeRefOrGetter<LookupField | null | undefined>,
	hasReadAccessFn?: LookupFieldHasReadAccess,
): {
	hasReadAccess: Ref<boolean>;
} => {
	const getInjected = injectFilterReadAccess();
	const hasReadAccess = computed(() =>
		hasLookupFieldReadAccess(toValue(field), hasReadAccessFn ?? getInjected()),
	);

	return {
		hasReadAccess,
	};
};
