import {
	createBaseStoreModule,
	createTableStoreModule,
} from '../../../store/new';
import objectPermissionsStoreModule from './objectPermissionsStoreModule';

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
