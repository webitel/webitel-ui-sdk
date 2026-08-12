import { getMemberService } from '@webitel/api-services/gen';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueMemberSchema } from '@webitel/api-services/validations';
import deepCopy from 'deep-copy';
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
 * The filters panel holds a range as one `{ from, to }` value; the flat pair is
 * still accepted. Bounds are int64 on the wire and timestamps in the panel,
 * hence the loose bound type.
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

/**
 * Range bounds are protobuf nested messages, so they bind as `created_at.from`
 * rather than the flattened `createdAtFrom` the generated params type declares.
 * Orval spreads what it is given straight into the request, so the dotted keys
 * reach the backend intact — they just cannot be expressed in that type.
 */
const rangeParams = (
	name: string,
	bounds: {
		from?: unknown;
		to?: unknown;
	},
) => ({
	[`${name}.from`]: bounds.from,
	[`${name}.to`]: bounds.to,
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
		const response = await getMemberService().searchMemberInQueue(
			Number(parentId),
			{
				page,
				size,
				// the generated param is `q`; `search` is what the datalist store sends
				q: search,
				sort,
				fields,
				id,
				bucketId: bucket,
				stopCause: stopCause ?? cause,
				agentId: agent,
				...rangeParams('created_at', created),
				...rangeParams('priority', prio),
			},
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
		const response = await getMemberService().readMember(
			String(parentId),
			String(id),
		);
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
		const response = await getMemberService().createMember(
			String(parentId),
			item,
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
		const response = await getMemberService().updateMember(
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
		const response = await getMemberService().deleteMember(
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
	const params = applyTransform(filters, [
		mapResetMembersQuantityFilters,
		starToSearch('q'),
	]);

	try {
		const response = await getMemberService().resetMembersCount(
			String(parentId),
			params,
		);
		// int64, so the service types it as a string
		return Number(response?.data?.count ?? 0);
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
		const response = await getMemberService().resetMembers(
			String(parentId),
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

const resetActiveAttempts = async (body: ApiParams) => {
	try {
		const response = await getMemberService().resetActiveAttempts(body);
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
		const response = await getMemberService().createMemberBulk(
			String(parentId),
			body,
		);
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
		const response = await getMemberService().deleteMembers(
			String(parentId),
			body,
		);
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
