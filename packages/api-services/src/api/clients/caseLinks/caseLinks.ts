import {
	getCaseLinks,
	ListLinksQueryParams,
	UpdateLinkBody,
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

const getLinksList = async ({ parentId, ...rest }) => {
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
		const response = await getCaseLinks().listLinks(parentId, {
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

const addLink = async ({ parentId, input }) => {
	try {
		const response = await getCaseLinks().createLink(parentId, {
			'input.url': input.url,
			'input.name': input.name,
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

const patchLink = async ({ parentId, linkId, changes }) => {
	const body = applyTransform(changes, [
		sanitize(getShallowFieldsToSendFromZodSchema(UpdateLinkBody)),
		camelToSnake(),
	]);

	try {
		const response = await getCaseLinks().updateLink(parentId, linkId, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteLink = async ({ parentId, etag }) => {
	try {
		const response = await getCaseLinks().deleteLink(parentId, etag);
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
