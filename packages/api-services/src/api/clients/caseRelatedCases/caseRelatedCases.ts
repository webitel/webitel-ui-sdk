import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import {
	getRelatedCases,
	ListRelatedCasesQueryParams,
} from '../../../gen-wire';

import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitizeToWire,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	ApiId,
	ApiParams,
	NestedDeleteItemParams,
} from '../_shared/types';

const getRelatedCasesList = async ({
	parentId,
	...rest
}: {
	parentId: ApiId;
} & ApiParams) => {
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListRelatedCasesQueryParams,
	);

	const { page, size, q, ids, sort, fields } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
			fields: [
				...(params.fields || []),
				'primary_case',
				'id',
			],
		}),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getRelatedCases().listRelatedCases(
			String(parentId),
			{
				page,
				size,
				q,
				sort,
				fields,
				ids,
			},
		);

		const { items, next } = applyTransform(
			{
				...response.data,
				items: response.data?.data || [],
			},
			[
				merge(getDefaultGetListResponse()),
			],
		);

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

const addRelatedCase = async ({
	parentId,
	input,
}: {
	parentId: ApiId;
	input: ApiParams;
}) => {
	try {
		const response = await getRelatedCases().createRelatedCase(
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

const deleteRelatedCase = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getRelatedCases().deleteRelatedCase(
			String(parentId),
			String(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const RelatedCasesAPI = {
	getList: getRelatedCasesList,
	delete: deleteRelatedCase,
	add: addRelatedCase,
};
