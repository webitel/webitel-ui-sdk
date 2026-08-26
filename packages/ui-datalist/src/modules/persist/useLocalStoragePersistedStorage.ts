import type { StorageLike } from './PersistedStorage.types.ts';
import { useWebStoragePersistedStorage } from './useWebStoragePersistedStorage';

export const useLocalStoragePersistedStorage = ({
	storagePath = '',
}: {
	storagePath?: string;
}): StorageLike => {
	return useWebStoragePersistedStorage({
		storage: () => localStorage,
		storagePath,
	});
};
