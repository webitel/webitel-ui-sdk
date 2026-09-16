import type { WtObject } from '../../../enums';
import type { ScopeClass } from '../enums';
import { mapScopeClassToWtObjects } from '../mappings/mappings';

export const getWtObjectForObjclass = (
	objclass?: string,
): WtObject | undefined => {
	if (!objclass) return undefined;

	return mapScopeClassToWtObjects[objclass as ScopeClass]?.[0];
};

export const hasReadAccessForObjclass = (
	hasReadAccess: (object?: WtObject) => boolean,
	objclass?: string,
): boolean => {
	if (!objclass) return false;

	const wtObject = getWtObjectForObjclass(objclass);
	if (wtObject) return hasReadAccess(wtObject);

	return hasReadAccess(objclass as WtObject);
};
