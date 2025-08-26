import { getDictionaries } from '@webitel/api-services/gen';

import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '../../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	sanitize,
	starToSearch,
} from '../../../transformers';

const getAdjunctTypesList = async (
	{ repo, ...params },
	{ silent = false } = {},
) => {
	const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

	const { page, size, fields, sort, id, q } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({ ...params, q: params.search }),
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getDictionaries().dictionariesSearchType({
			page,
			size,
			sort,
			fields,
			q,
			id,
		});
		const { data, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(data, []),
			next,
		};
	} catch (err) {
		if (silent) throw err; // dont show error if has no access to custom types

		throw applyTransform(err, [notify]);
	}
};

//   const getCustomLookupRecord = async ({ itemId: id, repo }) => {
//     try {
//       const response = await dictionariesService.locateData(repo, id);
//       return response.data;
//     } catch (err) {
//       throw applyTransform(err, [notify]);
//     }
//   };

//   const addCustomLookupRecord = async ({ itemInstance, fieldsToSend, repo }) => {
//     const item = applyTransform(itemInstance, [
//       camelToSnake(),
//       sanitize(fieldsToSend),
//     ]);
//     try {
//       const response = await dictionariesService.createData(repo, item);
//       return applyTransform(response.data, [snakeToCamel()]);
//     } catch (err) {
//       throw applyTransform(err, [notify]);
//     }
//   };

//   const updateCustomLookupRecord = async ({
//     itemInstance,
//     fieldsToSend,
//     itemId: id,
//     repo,
//   }) => {
//     const item = applyTransform(itemInstance, [
//       camelToSnake(),
//       sanitize(fieldsToSend),
//     ]);
//     try {
//       const response = await dictionariesService.updateData(repo, id, item);
//       return applyTransform(response.data, [snakeToCamel()]);
//     } catch (err) {
//       throw applyTransform(err, [notify]);
//     }
//   };

//   const deleteCustomLookupRecord = async ({ repo, id }) => {
//     try {
//       const response = await dictionariesService.deleteData2(repo, id);
//       return response.data;
//     } catch (err) {
//       throw applyTransform(err, [notify]);
//     }
//   };

//   const transformItemsForSelect =
//     ({ primary, display }) =>
//     (items) => {
//       return items.map((item) => ({
//         id: item[primary],
//         name: get(item, display.split('.')),
//       }));
//     };

//   // In this method we are using the same API as in getCustomLookupRecords,
//   // but we are using different parameters, so we need to create a new method where we can pass the type of the lookup where type is path to api
//   // for example: 'cities' has type 'dictionary/cities'
//   const getCustomLookupRecordsLookup = async ({
//     path,
//     display,
//     primary,
//     ...params
//   }) => {
//     const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

//     const url = applyTransform(params, [
//       merge(getDefaultGetParams()),
//       starToSearch('search'),
//       (params) => ({ ...params, q: params.search }),
//       sanitize(fieldsToSend),
//       camelToSnake(),
//       generateUrl(path),
//     ]);
//     try {
//       const response = await instance.get(url);
//       const { data, items, next } = applyTransform(response.data, [
//         merge(getDefaultGetListResponse()),
//       ]);

//       return {
//         // Some endpoints return data, some return items so we need to check for both of them
//         items:
//           applyTransform(data || items, [
//             transformItemsForSelect({ display, primary }),
//           ]) ?? [],
//         next,
//       };
//     } catch (err) {
//       throw applyTransform(err, [notify]);
//     }
//   };

//   const CustomLookupApi = {
//     getList: getCustomLookupRecords,
//     get: getCustomLookupRecord,
//     add: addCustomLookupRecord,
//     update: updateCustomLookupRecord,
//     delete: deleteCustomLookupRecord,

//     getLookup: getCustomLookupRecordsLookup,
//   };

//   export default CustomLookupApi;

export const AdjunctTypesAPI = {
	getList: getAdjunctTypesList,
};

/**
 * @alias AdjunctTypesAPI
 */
export const CustomLookupAPI = AdjunctTypesAPI;
