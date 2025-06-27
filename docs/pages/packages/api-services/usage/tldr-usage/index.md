# TLDR; 

All-together usage example:
[caseSources.ts](https://github.com/webitel/webitel-ui-sdk/blob/master/packages/api-services/src/api/clients/caseSources/caseSources.ts)

```ts
// @webitel/api-services/api/.../caseSources.ts  // [!code highlight]

import {
    getSources, // service [!code highlight]
    createSourceBody, // zod [!code highlight]
	listSourcesQueryParams, // zod [!code highlight]
} from '@webitel/api-services/gen'; // absolute import, inside @webitel/api-services/api  [!code highlight]
import {
    getShallowFieldsToSendFromZodSchema,  // util script [!code highlight]
} from '@webitel/api-services/gen/utils'; // absolute import, inside @webitel/api-services/api  [!code highlight]

import {
    getDefaultGetListResponse,
    getDefaultGetParams,
} from '../../defaults'; // relative import, avoid circular deps [!code highlight]
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers'; // relative import, avoid circular deps [!code highlight]

const getSourcesList = async (params) => {
    // dynamically, from generated
	const fieldsToSend = getShallowFieldsToSendFromZodSchema(  // [!code highlight]
		listSourcesQueryParams,  // [!code highlight]
	);  // [!code highlight]

	const { page, size, fields, sort, id, q, type } = applyTransform(params, [
		merge(getDefaultGetParams()), // static defaults, not generated (for now)
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	try {
		const response = await getSources() // call fn () to get api functions
            .listSources({ // params passed as OBJECT! [!code highlight]
			page,
			size,
			fields,
			sort,
			id,
			q: q || params.search, // it is Object, so key names matter!! [!code highlight]
			type,
		});
		const { items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()), // static default, as for now
		]);
		return {
			items: applyTransform(items, []),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getSource = async ({ itemId: id }) => {
	try {
		const response = await getSources() // call fn() too [!code highlight]
            .locateSource(id); //[!code highlight]
		return applyTransform(response.data, [snakeToCamel(), itemResponseHandler]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const addSource = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(getShallowFieldsToSendFromZodSchema(createSourceBody)),
		camelToSnake(),
	]);
	try {
		const response = await getSources() // call fn() too [!code highlight]
            .createSource(item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const updateSource = async ({ itemInstance, itemId: id }) => {
    const fieldsToSend = getShallowFieldsToSendFromZodSchema(updateSourceBody); // [!code highlight]
    
	const item = applyTransform(itemInstance, [
        sanitize(fieldsToSend), // [!code highlight]
        camelToSnake(),
	]);

	try {
		const response = await getSources() // call fn() too [!code highlight]
            .updateSource(id, item);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const deleteSource = async ({ id }) => {
	try {
		const response = await getSources() // call fn() too [!code highlight]
            .deleteSource(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getLookup = (params) =>
	getSourcesList({
		...params,
		fields: params.fields || ['id', 'name', 'type'],
	});

export const CaseSourcesAPI = { // named export! [!code highlight]
	getList: getSourcesList,
	get: getSource,
	add: addSource,
	update: updateSource,
	delete: deleteSource,
	getLookup,
};
```
