import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	type AccessStoreToggleDefaultAccessBody,
	type ClassesUpdateClassBody,
	getAccessStore,
	getClasses,
	ListDefaultAccessQueryParams,
	SearchClassesQueryParams,
} from '../../../gen-wire';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	mergeEach,
	notify,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import {
	generatePermissionsApi,
	handlePermissionsList,
	omitIdField,
} from '../_shared/generatePermissionsApi';
import type {
	ApiId,
	ApiParams,
	GetItemParams,
	PatchItemParams,
} from '../_shared/types';

const baseUrl = '/objclass';

/** [Claude] the "default" (RBAC) access of a class lives in the acl store, under this object name */
const rbacObjectName = 'objclass';

/*
 [Claude] the gateway maps request and response bodies to one field (`body: "class"`,
 `body: "list"`), so the wire carries that field's value itself: a plain class
 object, a plain array of changes. The generated types describe the envelope,
 hence the casts below.
*/

const getObjectClassesList = async (params: ApiParams) => {
	const defaultObject = {
		class: '',
		obac: false,
		rbac: false,
		id: 0,
	};

	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			class: params.search,
		}),
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(SearchClassesQueryParams),
		),
		camelToSnake(),
	]);
	try {
		const response = await getClasses().searchClasses(requestParams);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getObjectClass = async ({ itemId: id }: GetItemParams) => {
	try {
		const response = await getClasses().readClass(String(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchObjectClass = async ({ changes, id }: PatchItemParams) => {
	const body = applyTransform(changes, [
		camelToSnake(),
	]);
	try {
		const response = await getClasses().updateClass2(
			String(id),
			body as ClassesUpdateClassBody,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/** [Claude] RBAC rows: which grantee gets which rights on the objects created by a grantor */
const getObjectClassRbacList = async ({
	parentId,
	...params
}: {
	parentId: ApiId;
} & ApiParams) => {
	const requestParams = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params: ApiParams) => ({
			...params,
			q: params.search,
		}),
		omitIdField,
		sanitizeToWire(
			getShallowFieldsToSendFromZodSchema(ListDefaultAccessQueryParams),
		),
		camelToSnake(),
	]);
	try {
		const response = await getAccessStore().listDefaultAccess(
			rbacObjectName,
			String(parentId),
			requestParams,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				handlePermissionsList,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchObjectClassRbac = async ({
	parentId,
	grantorId,
	changes,
}: {
	parentId: ApiId;
	grantorId: ApiId;
	changes: ApiParams[];
}) => {
	const body = applyTransform(changes, [
		camelToSnake(),
	]);
	try {
		const response = await getAccessStore().toggleDefaultAccess(
			rbacObjectName,
			String(parentId),
			String(grantorId),
			body as AccessStoreToggleDefaultAccessBody,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const ObjectClassesAPI = {
	getList: getObjectClassesList,
	get: getObjectClass,
	patch: patchObjectClass,

	getRbacList: getObjectClassRbacList,
	patchRbac: patchObjectClassRbac,

	...generatePermissionsApi(baseUrl),
};
