import { ExtensionsApiFactory, type WebitelProtoDataStruct } from 'webitel-sdk';
import { getDefaultInstance, getDefaultOpenAPIConfig } from '../../../defaults';
import applyTransform, {
	camelToSnake,
	notify,
	sanitize,
	snakeToCamel,
} from '../../../transformers';
import type { ApiParams } from '../../_shared/types';
import { sortDynamicFields } from '../_shared/utils/sortDynamicFields';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const typeExtensionsService = ExtensionsApiFactory(configuration, '', instance);

const fieldsToSend = [
	'fields',
	'repo',
	'path',
];

const generateIdsFromRepos = (item: WebitelProtoDataStruct) => ({
	...item,
	id: item.repo,
});

const getTypeExtension = async ({ itemId: typeRepo }: { itemId: string }) => {
	const createPositionGenerator = () => {
		let position = 1;
		return (item: ApiParams) => (item.readonly ? null : position++);
	};
	const getPosition = createPositionGenerator();

	const itemResponseHandler = (item: ApiParams) => ({
		...item,
		fields: item.fields.map((field: ApiParams) => ({
			...field,
			position: getPosition(field),
		})),
	});

	try {
		const response = await typeExtensionsService.locateType(typeRepo);

		return applyTransform(response.data, [
			snakeToCamel(),
			generateIdsFromRepos,
			itemResponseHandler,
		]);
	} catch {
		return {
			id: typeRepo,
			fields: [],
			isNew: true,
		};
	}
};

const addTypeExtension = async ({
	itemInstance,
	itemId: typeRepo,
}: {
	itemInstance: ApiParams;
	itemId: string;
}) => {
	const item = applyTransform(itemInstance, [
		sortDynamicFields,
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await typeExtensionsService.createType(typeRepo, item);
		return applyTransform(response.data, [
			snakeToCamel(),
			generateIdsFromRepos,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteTypeExtension = async ({
	itemId: typeRepo,
}: {
	itemId: string;
}) => {
	try {
		await typeExtensionsService.deleteType([
			typeRepo,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateTypeExtension = async ({
	itemInstance,
	itemId: typeRepo,
}: {
	itemInstance: ApiParams;
	itemId: string;
}) => {
	if (!itemInstance.fields.length && itemInstance.isNew) {
		return itemInstance;
	}
	if (itemInstance.isNew) {
		return addTypeExtension({
			itemInstance,
			itemId: typeRepo,
		});
	}

	if (!itemInstance.fields.length && !itemInstance.isNew) {
		return deleteTypeExtension({
			itemId: typeRepo,
		});
	}

	const item = applyTransform(itemInstance, [
		sortDynamicFields,
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await typeExtensionsService.updateType(typeRepo, item);
		return applyTransform(response.data, [
			snakeToCamel(),
			generateIdsFromRepos,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const WtTypeExtensionApi = {
	getList: getTypeExtension,
	add: addTypeExtension,
	update: updateTypeExtension,
	delete: deleteTypeExtension,
};

export {
	addTypeExtension,
	deleteTypeExtension,
	getTypeExtension,
	updateTypeExtension,
};

export default WtTypeExtensionApi;
