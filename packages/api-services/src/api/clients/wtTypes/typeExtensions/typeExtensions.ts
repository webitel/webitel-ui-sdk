import { ExtensionsApiFactory, type WebitelProtoDataStruct } from 'webitel-sdk';

import { getDefaultInstance, getDefaultOpenAPIConfig } from '../../../defaults';
import {
	applyTransform,
	camelToSnake,
	notify,
	sanitize,
	snakeToCamel,
} from '../../../transformers';
import { assignFieldPositions } from '../_shared/utils/assignFieldPositions';
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

const getTypeExtension = async ({ itemId: typeRepo }) => {
	try {
		const response = await typeExtensionsService.locateType(typeRepo);

		return applyTransform(response.data, [
			snakeToCamel(),
			generateIdsFromRepos,
			assignFieldPositions,
		]);
	} catch {
		return {
			id: typeRepo,
			fields: [],
			isNew: true,
		};
	}
};

const addTypeExtension = async ({ itemInstance, itemId: typeRepo }) => {
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

const deleteTypeExtension = async ({ itemId: typeRepo }) => {
	try {
		await typeExtensionsService.deleteType(typeRepo);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateTypeExtension = async ({ itemInstance, itemId: typeRepo }) => {
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
		await deleteTypeExtension({
			itemId: typeRepo,
		});

		return {
			id: typeRepo,
			fields: [],
			isNew: true,
		};
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

export const WtTypeExtensionAPI = {
	get: getTypeExtension,
	add: addTypeExtension,
	update: updateTypeExtension,
	delete: deleteTypeExtension,
};
