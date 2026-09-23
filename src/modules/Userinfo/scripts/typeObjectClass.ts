import { ObjectsAPI } from '@webitel/api-services/api';
import type { ProtoDataStruct } from '@webitel/api-services/gen-wire/models';
import { reactive } from 'vue';

/**
 * Type-registry `lookup.path` often has no RBAC class on the field itself.
 * `/types/{path}` returns `objclass`; we cache it so lookup Read checks can
 * fail closed while the request is in flight and re-enable when it lands.
 */
const objectClassByPath = reactive(new Map<string, string | undefined>());
const inflightByPath = new Map<string, Promise<string | undefined>>();

export const normalizeLookupPath = (path?: string) =>
	path?.replace(/^\//, '') || undefined;

const fetchTypeObjectClass = async (
	path: string,
): Promise<string | undefined> => {
	if (objectClassByPath.has(path)) {
		return objectClassByPath.get(path);
	}

	const inflight = inflightByPath.get(path);
	if (inflight) return inflight;

	const request = ObjectsAPI.get({
		itemId: path,
	})
		.then((type: ProtoDataStruct) => {
			const objectClass = type?.objclass;
			objectClassByPath.set(path, objectClass);
			return objectClass;
		})
		.catch(() => {
			objectClassByPath.set(path, undefined);
			return undefined;
		})
		.finally(() => {
			inflightByPath.delete(path);
		});

	inflightByPath.set(path, request);
	return request;
};

export const peekTypeObjectClass = (path?: string) => {
	const normalized = normalizeLookupPath(path);
	if (!normalized) return undefined;

	if (!objectClassByPath.has(normalized)) {
		void fetchTypeObjectClass(normalized);
	}

	return objectClassByPath.get(normalized);
};
