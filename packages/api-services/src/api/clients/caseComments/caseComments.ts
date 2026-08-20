import {
	getCaseComments,
	ListCommentsQueryParams,
	UpdateCommentBody,
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

const getCommentsList = async ({ parentId, ...rest }) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListCommentsQueryParams,
	);

	const { page, size, q, ids, sort } = applyTransform(rest, [
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
		const response = await getCaseComments().listComments(parentId, {
			page,
			size,
			q,
			ids,
			sort,
			fields: [
				'id',
				'etag',
				'text',
				'created_at',
				'updated_at',
				'created_by',
				'author',
				'can_edit',
				'edited',
			],
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

const addComment = async ({ parentId, input }) => {
	try {
		const response = await getCaseComments().publishComment(parentId, input);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchComment = async ({ commentId, changes }) => {
	const body = applyTransform(changes, [
		sanitize(getShallowFieldsToSendFromZodSchema(UpdateCommentBody)),
		camelToSnake(),
	]);

	try {
		const response = await getCaseComments().updateComment(commentId, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteComment = async ({ etag }) => {
	try {
		const response = await getCaseComments().deleteComment(etag);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const CommentsAPI = {
	getList: getCommentsList,
	delete: deleteComment,
	add: addComment,
	patch: patchComment,
};
