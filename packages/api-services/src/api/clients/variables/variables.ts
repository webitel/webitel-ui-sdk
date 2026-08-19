import {
	getVariables,
	ListVariablesQueryParams,
	MergeVariablesBodyItem,
	UpdateVariableBody,
} from '@webitel/api-services/gen';
import type {
	ContactsInputVariable,
	DeleteVariablesParams,
	MergeVariablesParams,
	ResetVariablesParams,
} from '@webitel/api-services/gen/models';
import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import type { AxiosRequestConfig } from 'axios';
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

const addFieldsToSend = getShallowFieldsToSendFromZodSchema(
	MergeVariablesBodyItem,
);
const updateFieldsToSend =
	getShallowFieldsToSendFromZodSchema(UpdateVariableBody);

const getVariablesList = async ({
	parentId,
	...rest
}: Record<string, unknown> & {
	parentId: string;
}) => {
	const listFieldsToSend = getShallowFieldsToSendFromZodSchema(
		ListVariablesQueryParams,
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
		const response = await getVariables().listVariables(parentId, {
			page,
			size,
			q,
			sort,
			fields: [
				'etag',
				...fields,
			],
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

// no dedicated "locate one" endpoint exists for variables — reuse the list
// endpoint filtered to a single id, matching what the crm-local adapter did
const getVariable = async ({
	itemId,
	parentId,
}: {
	itemId: string;
	parentId: string;
}) => {
	try {
		const response = await getVariables().listVariables(parentId, {
			page: 1,
			size: 1,
			fields: [
				'key',
				'value',
				'etag',
			],
			id: [
				itemId,
			],
		});
		const { data } = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return data[0];
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addVariable = async ({
	parentId,
	itemInstance,
}: {
	parentId: string;
	itemInstance: Record<string, unknown>;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(addFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getVariables().mergeVariables(parentId, [
			item,
		]);
		const { data } = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return data[0];
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateVariable = async ({
	itemInstance,
	parentId,
}: {
	itemInstance: Record<string, unknown> & {
		etag: string;
	};
	parentId: string;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(updateFieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getVariables().updateVariable(
			parentId,
			itemInstance.etag,
			item,
		);
		const { data } = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return data[0];
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteVariable = async ({
	etag,
	parentId,
}: {
	etag: string;
	parentId: string;
}) => {
	try {
		const response = await getVariables().deleteVariable(parentId, etag);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getVariablesLookup = (
	params: Record<string, unknown> & {
		parentId: string;
	},
) =>
	getVariablesList({
		...params,
		fields: (params.fields as string[]) || [
			'etag',
			'key',
			'value',
		],
	});

/**
 * raw bulk endpoints — take/return the whole variables array in one call,
 * unlike add/update above which normalize a single item for createCardStore
 */
const mergeVariables = async ({
	contactId,
	variables,
	params,
	options,
}: {
	contactId: string;
	variables: ContactsInputVariable[];
	params?: MergeVariablesParams;
	options?: AxiosRequestConfig;
}) => {
	const body = applyTransform(variables, [
		camelToSnake(),
	]);
	try {
		const response = await getVariables().mergeVariables(
			contactId,
			body,
			params,
			options,
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

const resetVariables = async ({
	contactId,
	variables,
	params,
	options,
}: {
	contactId: string;
	variables: ContactsInputVariable[];
	params?: ResetVariablesParams;
	options?: AxiosRequestConfig;
}) => {
	const body = applyTransform(variables, [
		camelToSnake(),
	]);
	try {
		const response = await getVariables().resetVariables(
			contactId,
			body,
			params,
			options,
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

const deleteVariables = async ({
	contactId,
	params,
	options,
}: {
	contactId: string;
	params: DeleteVariablesParams;
	options?: AxiosRequestConfig;
}) => {
	try {
		const response = await getVariables().deleteVariables(
			contactId,
			params,
			options,
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

export const VariablesAPI = {
	getList: getVariablesList,
	get: getVariable,
	add: addVariable,
	update: updateVariable,
	delete: deleteVariable,
	getLookup: getVariablesLookup,

	merge: mergeVariables,
	reset: resetVariables,
	deleteMany: deleteVariables,
};
