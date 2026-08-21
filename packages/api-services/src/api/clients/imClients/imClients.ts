import {
	getImclients,
	ListIMClientsQueryParams,
} from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

const getIMClientsList = async ({
	parentId,
	...rest
}: ApiParams & {
	parentId: ApiId;
}) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListIMClientsQueryParams,
	);

	const {
		page,
		size,
		q,
		sort,
		fields = [],
		id,
	} = applyTransform(rest, [
		sanitize(listFieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('q'),
	]);
	try {
		const response = await getImclients().listIMClients(String(parentId), {
			page,
			size,
			q,
			sort,
			fields,
			id,
		});
		const { data, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: data,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteIMClient = async ({
	id,
	parentId,
}: {
	id: ApiId;
	parentId: ApiId;
}) => {
	try {
		const response = await getImclients().deleteIMClient(
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

const getIMClientsLookup = (
	params: ApiParams & {
		parentId: ApiId;
	},
) =>
	getIMClientsList({
		...params,
		fields: (params.fields as string[]) || [
			'id',
			'user',
			'app',
			'protocol',
		],
	});

export const IMClientsAPI = {
	getList: getIMClientsList,
	delete: deleteIMClient,
	getLookup: getIMClientsLookup,
};
