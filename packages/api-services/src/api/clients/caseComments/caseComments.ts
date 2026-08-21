import {
	getCaseComments,
	ListCommentsQueryParams,
	UpdateComment2Body,
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

const getCommentsList = async ({
	parentId,
	...rest
}: {
	parentId: ApiId;
} & ApiParams) => {
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
		const response = await getCaseComments().listComments(String(parentId), {
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

const addComment = async ({
	parentId,
	input,
}: {
	parentId: ApiId;
	input: ApiParams;
}) => {
	try {
		const response = await getCaseComments().publishComment(
			String(parentId),
			input,
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

const patchComment = async ({
	commentId,
	changes,
}: {
	commentId: ApiId;
	changes: ApiParams;
}) => {
	const body = applyTransform(changes, [
		sanitize(getShallowFieldsToSendFromZodSchema(UpdateComment2Body)),
		camelToSnake(),
	]);

	try {
		const response = await getCaseComments().updateComment2(
			String(commentId),
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

const deleteComment = async ({ etag }: { etag: ApiId }) => {
	try {
		const response = await getCaseComments().deleteComment(String(etag));
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
