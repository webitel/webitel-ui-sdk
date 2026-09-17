import { getTypes } from '@webitel/api-services/gen-wire';
import type { ProtoDataStruct } from '@webitel/api-services/gen-wire/models';
import { reactive } from 'vue';

const objclassByPath = reactive(new Map<string, string | undefined>());
const inflightByPath = new Map<string, Promise<string | undefined>>();

export const normalizeLookupPath = (path?: string) =>
	path?.replace(/^\//, '') || undefined;

const fetchTypeObjclass = (path: string): Promise<string | undefined> => {
	if (objclassByPath.has(path)) {
		return Promise.resolve(objclassByPath.get(path));
	}

	const inflight = inflightByPath.get(path);
	if (inflight) return inflight;

	const request = getTypes()
		.locate(encodeURIComponent(path))
		.then((response: { data?: ProtoDataStruct }) => {
			const objclass = response.data?.objclass;
			objclassByPath.set(path, objclass);
			return objclass;
		})
		.catch(() => {
			objclassByPath.set(path, undefined);
			return undefined;
		})
		.finally(() => {
			inflightByPath.delete(path);
		});

	inflightByPath.set(path, request);
	return request;
};

export const peekTypeObjclass = (path?: string) => {
	const normalized = normalizeLookupPath(path);
	if (!normalized) return undefined;

	if (!objclassByPath.has(normalized)) {
		void fetchTypeObjclass(normalized);
	}

	return objclassByPath.get(normalized);
};
