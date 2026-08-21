import {
	getCaseLinks,
	ListLinksQueryParams,
	UpdateLink2Body,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const getLinksList = async ({
	parentId,
	...rest
}: {
	parentId: ApiId;
} & ApiParams) => {
	const fieldsToSend =
		getShallowFieldsToSendFromZodSchema(ListLinksQueryParams);

	const { page, size, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCaseLinks().listLinks(String(parentId), {
			page,
			size,
			q,
		});

		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				snakeToCamel(),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addLink = async ({
	parentId,
	input,
}: {
	parentId: ApiId;
	input: ApiParams;
}) => {
	try {
		const response = await getCaseLinks().createLink(String(parentId), {
			inputUrl: input.url,
			inputName: input.name,
		});
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchLink = async ({
	parentId,
	linkId,
	changes,
}: {
	parentId: ApiId;
	linkId: ApiId;
	changes: ApiParams;
}) => {
	const body = applyTransform(changes, [
		sanitize(getShallowFieldsToSendFromZodSchema(UpdateLink2Body)),
		camelToSnake(),
	]);

	try {
		const response = await getCaseLinks().updateLink2(
			String(parentId),
			String(linkId),
			body,
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

const deleteLink = async ({
	parentId,
	etag,
}: {
	parentId: ApiId;
	etag: ApiId;
}) => {
	try {
		const response = await getCaseLinks().deleteLink(
			String(parentId),
			String(etag),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const CaseLinksAPI = {
	getList: getLinksList,
	delete: deleteLink,
	add: addLink,
	patch: patchLink,
};
