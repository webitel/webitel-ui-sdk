import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { getCaseFiles, ListFilesQueryParams } from '../../../gen-wire';

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

const getFilesList = async ({
	parentId,
	...rest
}: {
	parentId: ApiId;
} & ApiParams) => {
	const fieldsToSend =
		getShallowFieldsToSendFromZodSchema(ListFilesQueryParams);

	const { page, size, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCaseFiles().listFiles(String(parentId), {
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

const deleteFile = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await getCaseFiles().deleteFile(
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

export const CaseFilesAPI = {
	getList: getFilesList,
	delete: deleteFile,
};
