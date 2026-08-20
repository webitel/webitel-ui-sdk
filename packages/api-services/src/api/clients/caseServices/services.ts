import {
	getServices,
	ListServicesQueryParams,
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

// Not derived from CreateServiceBody/UpdateServiceBody: those generated zod
// schemas describe the wire shape (nested `sla: {id, name}` etc., camelCase),
// while preRequestHandler below flattens the UI shape into these snake_case
// `_id`/`_ids` keys before sanitize runs — the two shapes don't line up.
const fieldsToSend = [
	'id',
	'name',
	'description',
	'prefix',
	'code',
	'state',
	'sla_id',
	'status_id',
	'close_reason_id',
	'team_ids',
	'skill_ids',
];

const preRequestHandler = (item) => {
	return {
		...item,
		state: item.state ?? true,
		sla_id: item.sla?.id,
		status_id: item.status?.id,
		close_reason_id: item.closeReason?.id,
		team_ids: item.teams?.map((team) => team.id),
		skill_ids: item.skills?.map((skill) => skill.id),
	};
};

const getServicesList = async ({ rootId, ...rest }) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListServicesQueryParams,
	);

	const { page, size, fields, sort, id, q } = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(listFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getServices().listServices({
			page,
			size,
			sort,
			id,
			q,
			rootId,
			fields,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getService = async ({ itemId: id }) => {
	const serviceFieldsToSend = [
		'name',
		'code',
		'sla',
		'teams',
		'skills',
		'status',
		'state',
		'close_reason',
		'default_priority',
		'reason',
		'description',
		'services',
		'assignee',
		'root_id',
		'catalog_id',
		'group',
	];

	const itemResponseHandler = (item) => {
		return item.service;
	};

	try {
		const response = await getServices().locateService(id, {
			fields: serviceFieldsToSend,
		});
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addService = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getServices().createService(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateService = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getServices().updateService(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchService = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getServices().updateService2(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteService = async ({ id }) => {
	try {
		const response = await getServices().deleteService(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getServicesLookup = (params) =>
	getServicesList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const ServicesAPI = {
	getList: getServicesList,
	get: getService,
	add: addService,
	update: updateService,
	patch: patchService,
	delete: deleteService,
	getLookup: getServicesLookup,
};
