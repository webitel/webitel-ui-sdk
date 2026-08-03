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

const getIMClientsList = async ({
	parentId,
	...rest
}: Record<string, unknown> & {
	parentId: string;
}) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListIMClientsQueryParams,
	);

	const { page, size, q, sort, fields, id } = applyTransform(rest, [
		sanitize(listFieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('q'),
	]);
	try {
		const response = await getImclients().listIMClients(parentId, {
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
	id: string;
	parentId: string;
}) => {
	try {
		const response = await getImclients().deleteIMClient(parentId, id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getIMClientsLookup = (
	params: Record<string, unknown> & {
		parentId: string;
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
