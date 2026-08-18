import type { StorageLike } from './PersistedStorage.types.ts';
import { useWebStoragePersistedStorage } from './useWebStoragePersistedStorage';

export const useSessionStoragePersistedStorage = ({
	storagePath = '',
}: {
	storagePath?: string;
}): StorageLike => {
	return useWebStoragePersistedStorage({
		storage: () => sessionStorage,
		storagePath,
	});
};
