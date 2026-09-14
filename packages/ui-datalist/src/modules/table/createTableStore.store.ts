import { createDatalistStore } from '../_shared/createDatalistStore';
import type { Identifiable } from '../types/createDatalistStore.types';
import type { useTableStoreConfig } from '../types/tableStore.types';
import { createListSession } from './createListSession';

export type { ListSession } from './createListSession';
export { createListSession, tableStoreBody } from './createListSession';

/**
 * Pinia (or composable) store factory for a list-session.
 * Body lives in {@link createListSession}; this only wraps it for store identity.
 */
export const createTableStore = <Entity extends Identifiable>(
	namespace: string,
	config: useTableStoreConfig<Entity>,
) => {
	return createDatalistStore({
		storeBody: () => createListSession(namespace, config),
		namespace,
		config,
	});
};
