import type { SearchMemberInQueueParams } from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { queueMemberSchema } from '@webitel/api-services/validations';
import deepCopy from 'deep-copy';
import { getMemberService } from '../../../gen-wire';
import { normalizeDatetimeRange } from '../../../scripts';
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
		offeringAt,
		bucket,
		memberPriority,
		stopCause,
		agent,
		attempts,
		name,
		destination,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		({ createdAt, offeringAt, from, to, cause, stopCause, ...rest }) => ({
			...rest,
			createdAt: normalizeDatetimeRange(
				createdAt ??
					(from != null || to != null
						? {
								from,
								to,
							}
						: undefined),
			),
			offeringAt: normalizeDatetimeRange(offeringAt),
			stopCause: stopCause ?? cause,
		}),
		starToSearch('search'),
	]);

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
				stopCause,
				agentId: agent,
				'created_at.from': createdAt?.from,
				'created_at.to': createdAt?.to,
				'offering_at.from': offeringAt?.from,
				'offering_at.to': offeringAt?.to,
				'priority.from': memberPriority?.from,
				'priority.to': memberPriority?.to,
				'attempts.from': attempts?.from,
				'attempts.to': attempts?.to,
				name,
				destination,
			} as SearchMemberInQueueParams,
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
		sanitizeToWire(fieldsToSend),
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
		sanitizeToWire(fieldsToSend),
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
	const created = normalizeDatetimeRange(
		filters.createdAt ??
			(filters.from != null || filters.to != null
				? {
						from: filters.from,
						to: filters.to,
					}
				: undefined),
	);

	let body: ApiParams = {
		id,
		q: filters.search,
		createdAt: created?.from || created?.to ? created : undefined,
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
