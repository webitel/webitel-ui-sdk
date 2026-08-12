import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueMemberSchema } from '@webitel/api-services/validations';
import deepCopy from 'deep-copy';
import { MemberServiceApiFactory } from 'webitel-sdk';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
	getDefaultOpenAPIConfig,
} from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type {
	ApiId,
	ApiParams,
	NestedAddItemParams,
	NestedDeleteItemParams,
	NestedGetItemParams,
	NestedUpdateItemParams,
} from '../_shared/types';
import {
	mapResetMembersFilters,
	mapResetMembersQuantityFilters,
} from './scripts/mapResetMembersFilters';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

/**
 * Stays on the `webitel-sdk` factory rather than the generated client: the
 * `created_at` and `priority` filters are protobuf nested messages on the wire,
 * and orval's flattened `createdAtFrom`/`priorityFrom` names do not round-trip
 * through `camelToSnake()` — every range filter would be silently dropped.
 */
const service = MemberServiceApiFactory(configuration, '', instance);

/** `variables` is a user-keyed map; its keys must survive case conversion. */
const doNotConvertKeys = [
	'variables',
];

const fieldsToSend = [
	...getShallowFieldsToSendFromZodSchema(queueMemberSchema),
	// injected by preRequestHandler; not part of the form, so not in the schema
	'queueId',
];

const defaultSingleObjectCommunication = {
	destination: '',
	display: '',
	priority: 0,
	type: {},
	resource: {},
	description: '',
	dtmf: '',
};

const mapDefaultCommunications = (item: ApiParams) => {
	const copy = deepCopy(item);
	return copy.communications
		? copy.communications.map((comm: ApiParams) => ({
				...defaultSingleObjectCommunication,
				...comm,
			}))
		: [];
};

/**
 * NB: communications are deliberately sent whole rather than through a
 * field whitelist. The original code looked like it whitelisted them, but
 * called the curried `sanitize` with two arguments, so it built a function and
 * threw it away — communications have always gone out complete. Applying the
 * whitelist now would strip each communication's `id`, which the backend needs
 * to update rather than recreate them.
 */
const preRequestHandler = (item: ApiParams) => {
	const copy = deepCopy(item);
	const variables = (copy.variables ?? []).reduce(
		(acc: ApiParams, variable: ApiParams) => {
			if (!variable.key) return acc;
			acc[variable.key] = variable.value;
			return acc;
		},
		{},
	);
	return {
		...copy,
		variables,
	};
};

/**
 * Range bounds cross the wire as int64, which `webitel-sdk` types as string
 * while the filter panel holds them as timestamps — hence the loose bound type.
 */
const range = (
	value?: ApiParams,
	// biome-ignore lint/suspicious/noExplicitAny: see above
	from?: any,
	// biome-ignore lint/suspicious/noExplicitAny: see above
	to?: any,
) => ({
	from: value?.from ?? from,
	to: value?.to ?? to,
});

const getMembersList = async (params: ApiParams) => {
	const listHandler = (items: ApiParams[]) => {
		const copy = deepCopy(items);
		return copy.map((item: ApiParams) => ({
			...item,
			communications: applyTransform(item, [
				mapDefaultCommunications,
			]),
		}));
	};

	const {
		page,
		size,
		search,
		sort,
		fields,
		id,
		parentId,
		createdAt,
		from,
		to,
		bucket,
		memberPriority,
		priority,
		priorityFrom,
		priorityTo,
		stopCause,
		cause,
		agent,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	const created = range(createdAt, from, to);
	const prio = range(memberPriority ?? priority, priorityFrom, priorityTo);

	try {
		const response = await service.searchMemberInQueue(
			Number(parentId),
			page,
			size,
			search,
			sort,
			fields,
			id,
			bucket,
			undefined,
			created.from,
			created.to,
			undefined,
			undefined,
			stopCause ?? cause,
			prio.from,
			prio.to,
			undefined,
			undefined,
			undefined,
			agent,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				listHandler,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getMember = async ({ parentId, itemId: id }: NestedGetItemParams) => {
	const responseHandler = (response: ApiParams) => {
		const copy = deepCopy(response);
		let variables: ApiParams[] = [];
		if (copy.variables) {
			variables = Object.keys(copy.variables).map((key) => ({
				key,
				value: copy.variables[key],
			}));
		}
		const communications = mapDefaultCommunications(copy);
		return {
			...response,
			variables,
			communications,
		};
	};

	try {
		const response = await service.readMember(String(parentId), String(id));
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
			responseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addMember = async ({ parentId, itemInstance }: NestedAddItemParams) => {
	const item = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await service.createMember(String(parentId), item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateMember = async ({
	itemInstance,
	itemId: id,
	parentId,
}: NestedUpdateItemParams) => {
	const body = applyTransform(itemInstance, [
		preRequestHandler,
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await service.updateMember(
			String(parentId),
			String(id),
			body,
		);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteMember = async ({ parentId, id }: NestedDeleteItemParams) => {
	try {
		const response = await service.deleteMember(String(parentId), String(id));
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/**
 * How many members the current filter set would reset. A GET, so the nested
 * range messages go out as dotted query keys — see mapResetMembersQuantityFilters.
 */
const getMembersQuantity = async ({
	parentId,
	filters,
}: {
	parentId: ApiId;
	filters?: ApiParams;
}) => {
	const url = `/call_center/queues/${parentId}/members/reset/count`;

	const params = applyTransform(filters, [
		mapResetMembersQuantityFilters,
		starToSearch('q'),
	]);

	try {
		const response = await instance.get(url, {
			params,
		});
		return response?.data?.count || 0;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const resetMembers = async ({
	parentId,
	filters,
}: {
	parentId: ApiId;
	filters?: ApiParams;
}) => {
	const body = applyTransform(filters, [
		mapResetMembersFilters,
		starToSearch('q'),
	]);

	try {
		const response = await service.resetMembers(String(parentId), body);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const resetActiveAttempts = async (body: ApiParams) => {
	try {
		const response = await service.resetActiveAttempts(body);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/** CSV import. Not part of the ApiModule contract — called straight from the popup. */
const addMembersBulk = async ({
	parentId,
	fileName,
	items,
}: {
	parentId: ApiId;
	fileName: string;
	items: ApiParams[];
}) => {
	const body = {
		parentId,
		fileName,
		items,
	};
	try {
		const response = await service.createMemberBulk(String(parentId), body);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
			notify(({ callback }: ApiParams) =>
				callback({
					type: 'success',
					text: 'Successfully added',
				}),
			),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

/**
 * Deletes by explicit ids, or by the current filter set when `id` is omitted.
 * `withoutMembers: true` is carried over from the original as-is.
 */
const deleteMembersBulk = async ({
	parentId,
	id,
	filters = {},
}: {
	parentId: ApiId;
	id?: ApiId[];
	filters?: ApiParams;
}) => {
	const created = range(filters.createdAt, filters.from, filters.to);

	let body: ApiParams = {
		id,
		q: filters.search,
		createdAt: created.from || created.to ? created : undefined,
		priority: filters.memberPriority ?? filters.priority,
		stopCause: filters.stopCause ?? filters.cause,
		bucketId: filters.bucket,
		withoutMembers: true,
	};

	body = applyTransform(body, [
		camelToSnake(),
	]);

	try {
		const response = await service.deleteMembers(String(parentId), body);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const QueueMembersAPI = {
	getList: getMembersList,
	getQuantity: getMembersQuantity,
	get: getMember,
	add: addMember,
	addBulk: addMembersBulk,
	update: updateMember,
	delete: deleteMember,
	deleteBulk: deleteMembersBulk,
	resetMembers,
	resetActiveAttempts,
};
