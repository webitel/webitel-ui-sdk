import {
	createBaseStoreModule,
	createTableStoreModule,
} from '../../../../../store/new/index.js';
import objectPermissionsStoreModule from '../modules/objectPermissionsStoreModule.js';

export const createObjectPermissionsStoreModule = (modules) => {
	const modulesArr = Array.isArray(modules)
		? modules
		: [
				modules,
			];

	const tableSubmodule = createTableStoreModule([
		objectPermissionsStoreModule(),
	]);

	return createBaseStoreModule([
		{
			modules: {
				table: tableSubmodule,
			},
		},
		...modulesArr,
	]);
};
