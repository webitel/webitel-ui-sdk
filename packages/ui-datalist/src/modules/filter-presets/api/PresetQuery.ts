import type {
	EngineCreatePresetQueryRequest,
	EnginePresetQuery,
} from '@webitel/api-services/gen/models';
import { getPresetQueryService } from '@webitel/api-services/gen-wire';
import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/api/defaults/index';
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	skipIf,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/api/transformers/index';
import type { Id } from '@webitel/ui-sdk/api/types/ApiModule';

const isConflictError = (err: unknown): boolean =>
	typeof err === 'object' &&
	err !== null &&
	'status' in err &&
	(
		err as {
			status: unknown;
		}
	).status === 409;

type GetPresetListRequestConfig = {
	transformers: {
		useStarToSearch?: boolean;
	};
};

const getPresetList = async (
	params?: unknown,
	config?: GetPresetListRequestConfig,
) => {
	const useStarToSearch = config?.transformers?.useStarToSearch ?? true;

	const { page, size, search, sort, fields, presetNamespace, id } =
		applyTransform(params, [
			merge(getDefaultGetParams()),
			(params: object) =>
				useStarToSearch ? starToSearch('search')(params) : params,
		]);
	try {
		const response = await getPresetQueryService().searchPresetQuery({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort: sort || '-created_at',
			fields: fields || [
				'id',
				'name',
				'preset',
				'description',
			],
			id,
			section: [
				presetNamespace,
			],
		});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getPreset = async ({ id }: { id?: Id | null }) => {
	try {
		const response = await getPresetQueryService().readPresetQuery(Number(id));
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addPreset = async ({
	preset,
	namespace,
}: {
	preset: EngineCreatePresetQueryRequest;
	namespace: string;
}): Promise<EnginePresetQuery> => {
	const item = applyTransform(preset, [
		camelToSnake(),
		(item: {
			preset: {
				namespace: string;
			};
			section: string;
		}) => {
			item.preset.namespace = namespace;
			item.section = namespace;
			return item;
		},
	]);
	try {
		const response = await getPresetQueryService().createPresetQuery(item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			skipIf(notify, isConflictError),
		]);
	}
};

const updatePreset = async ({
	item: itemInstance,
	id,
	namespace,
}: {
	item: EngineCreatePresetQueryRequest;
	id: number;
	namespace: string;
}) => {
	const item = applyTransform(itemInstance, [
		camelToSnake(),
		(item: {
			preset: {
				namespace: string;
			};
			section: string;
		}) => {
			item.preset.namespace = namespace;
			item.section = namespace;
			return item;
		},
	]);
	try {
		const response = await getPresetQueryService().updatePresetQuery(id, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			skipIf(notify, isConflictError),
		]);
	}
};

const deletePreset = async ({ id }: { id?: Id | null }) => {
	try {
		const response = await getPresetQueryService().deletePresetQuery(
			Number(id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const PresetQueryAPI = {
	getList: getPresetList,
	get: getPreset,
	add: addPreset,
	update: updatePreset,
	delete: deletePreset,
};

export { addPreset, deletePreset, getPresetList, updatePreset };

export default PresetQueryAPI;
