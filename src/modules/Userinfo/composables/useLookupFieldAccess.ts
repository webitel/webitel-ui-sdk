import { computed, type MaybeRefOrGetter, type Ref, toValue } from 'vue';

import type { WtObject } from '../../../enums';
import {
	hasTypeObjclass,
	normalizeLookupPath,
	readTypeObjclass,
} from '../scripts/getTypeObjclass';
import {
	getWtObjectForObjclass,
	hasReadAccessForObjclass,
} from '../scripts/hasReadAccessForObjclass';
import { getUserinfoStore } from '../stores/userinfoStore';

type LookupField = {
	lookup?: {
		path?: string;
		objclass?: string;
	};
};

export const useLookupFieldAccess = (
	field: MaybeRefOrGetter<LookupField | null | undefined>,
): {
	hasReadAccess: Ref<boolean>;
	wtObject: Ref<WtObject | undefined>;
} => {
	const userinfoStore = getUserinfoStore();

	const lookupPath = computed(() =>
		normalizeLookupPath(toValue(field)?.lookup?.path),
	);
	const providedObjclass = computed(() => toValue(field)?.lookup?.objclass);

	const objclass = computed(
		() => providedObjclass.value ?? readTypeObjclass(lookupPath.value),
	);

	const wtObject = computed(() => getWtObjectForObjclass(objclass.value));

	const hasReadAccess = computed(() => {
		if (!lookupPath.value) return true;

		const currentObjclass = objclass.value;
		if (!providedObjclass.value && !hasTypeObjclass(lookupPath.value)) {
			return false;
		}

		return hasReadAccessForObjclass(
			userinfoStore.hasReadAccess,
			currentObjclass,
		);
	});

	return {
		hasReadAccess,
		wtObject,
	};
};
