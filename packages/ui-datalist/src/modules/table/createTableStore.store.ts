import { createDatalistStore } from '../_shared/createDatalistStore';
import type { Identifiable } from '../types/createDatalistStore.types';
import type { useTableStoreConfig } from '../types/tableStore.types';
import { createListCore } from './createListCore';

export type { ListCore } from './createListCore';
export { createListCore, tableStoreBody } from './createListCore';

/**
 * Pinia (or composable) factory over {@link createListCore}.
 * Package extensions that need the body itself import `createListCore`.
 */
export const createTableStore = <Entity extends Identifiable>(
	namespace: string,
	config: useTableStoreConfig<Entity>,
) => {
	return createDatalistStore({
		storeBody: () => createListCore(namespace, config),
		namespace,
		config,
	});
};
