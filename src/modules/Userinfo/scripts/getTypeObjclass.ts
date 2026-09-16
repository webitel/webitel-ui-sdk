import { getTypes } from '@webitel/api-services/gen-wire';
import type { ProtoDataStruct } from '@webitel/api-services/gen-wire/models';
import { reactive } from 'vue';

const objclassByPath = reactive(new Map<string, string | undefined>());
const inflightByPath = new Map<string, Promise<string | undefined>>();

export const normalizeLookupPath = (path?: string) =>
	path?.replace(/^\//, '') || undefined;

export const getTypeObjclass = (path?: string): Promise<string | undefined> => {
	const normalized = normalizeLookupPath(path);
	if (!normalized) return Promise.resolve(undefined);

	if (objclassByPath.has(normalized)) {
		return Promise.resolve(objclassByPath.get(normalized));
	}

	const inflight = inflightByPath.get(normalized);
	if (inflight) return inflight;

	const request = getTypes()
		.locate(normalized)
		.then((response: { data?: ProtoDataStruct }) => {
			objclassByPath.set(normalized, response.data?.objclass);
			return response.data?.objclass;
		})
		.catch(() => {
			objclassByPath.set(normalized, undefined);
			return undefined;
		})
		.finally(() => {
			inflightByPath.delete(normalized);
		});

	inflightByPath.set(normalized, request);
	return request;
};

export const readTypeObjclass = (path?: string) => {
	const normalized = normalizeLookupPath(path);
	if (!normalized) return undefined;

	if (!objclassByPath.has(normalized)) {
		void getTypeObjclass(normalized);
	}

	return objclassByPath.get(normalized);
};

export const hasTypeObjclass = (path?: string) => {
	const normalized = normalizeLookupPath(path);
	if (!normalized) return true;

	return objclassByPath.has(normalized);
};

export const clearTypeObjclassCache = () => {
	objclassByPath.clear();
	inflightByPath.clear();
};
