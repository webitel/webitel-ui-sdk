import type { ProtoDataStruct } from '@webitel/api-services/gen/models';
import { getExtensions } from '../../../../gen-wire';
import {
	applyTransform,
	camelToSnake,
	notify,
	sanitize,
	snakeToCamel,
} from '../../../transformers';
import type { ApiId, ApiParams } from '../../_shared/types';
import { sortDynamicFields } from '../_shared/utils/sortDynamicFields';

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
		const response = await getExtensions().locateTypeExtensions(typeRepo);

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
	itemId: ApiId;
}) => {
	const item = applyTransform(itemInstance, [
		sortDynamicFields,
		camelToSnake(),
		sanitize(fieldsToSend),
	]);
	try {
		const response = await getExtensions().createTypeExtensions(
			String(typeRepo),
			item,
		);
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

const deleteTypeExtension = async ({ itemId: typeRepo }: { itemId: ApiId }) => {
	try {
		await getExtensions().deleteTypeExtensions([
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
		const response = await getExtensions().updateTypeExtensions(
			String(typeRepo),
			item,
		);
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
	getList: getTypeExtension,
	add: addTypeExtension,
	update: updateTypeExtension,
	delete: deleteTypeExtension,
};
