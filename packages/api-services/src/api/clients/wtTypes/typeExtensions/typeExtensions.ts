import type { ProtoDataStruct } from '@webitel/api-services/gen/models';
import { getExtensions } from '../../../../gen-wire';
import {
	applyTransform,
	camelToSnake,
	notify,
	sanitizeToWire,
	snakeToCamel,
} from '../../../transformers';
import type { ApiId, ApiParams } from '../../_shared/types';
import { assignFieldPositions } from '../_shared/utils/assignFieldPositions';
import { sortDynamicFields } from '../_shared/utils/sortDynamicFields';

const typeExtensionsService = getExtensions();

const fieldsToSend = [
	'fields',
	'repo',
	'path',
];

const generateIdsFromRepos = (item: ProtoDataStruct) => ({
	...item,
	id: item.repo,
});

const getTypeExtension = async ({ itemId: typeRepo }: { itemId: string }) => {
	try {
		const response = await typeExtensionsService.locateTypeExtensions(typeRepo);

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

const addTypeExtension = async ({
	itemInstance,
	itemId: typeRepo,
}: {
	itemInstance: ApiParams;
	itemId: ApiId;
}) => {
	const item = applyTransform(itemInstance, [
		sortDynamicFields,
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await typeExtensionsService.createTypeExtensions(
			String(typeRepo),
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
			generateIdsFromRepos,
			assignFieldPositions,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteTypeExtension = async ({ itemId: typeRepo }: { itemId: ApiId }) => {
	try {
		await typeExtensionsService.deleteTypeExtensions([
			String(typeRepo),
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
	itemId: ApiId;
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
		sanitizeToWire(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await typeExtensionsService.updateTypeExtensions(
			String(typeRepo),
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
			generateIdsFromRepos,
			assignFieldPositions,
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
