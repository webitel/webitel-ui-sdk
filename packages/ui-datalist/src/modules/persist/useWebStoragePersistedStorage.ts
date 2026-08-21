import type { StorageLike } from './PersistedStorage.types.ts';

const separator = ';';

const makePath = (storagePath: string, key: string) => `${storagePath}/${key}`;

/* `storage` is a getter, so the global is touched at call time, not at module load */
export const useWebStoragePersistedStorage = ({
	storage,
	storagePath = '',
}: {
	storage: () => Storage;
	storagePath?: string;
}): StorageLike => {
	const getItem = async (key: string) => {
		const value = storage().getItem(makePath(storagePath, key));
		if (value === null) return null;
		return value.split(separator).join();
	};

	const setItem = async (key: string, inputValue: string | string[]) => {
		const value = Array.isArray(inputValue)
			? inputValue.join(separator)
			: inputValue;
		storage().setItem(makePath(storagePath, key), value);
	};

	const removeItem = async (key: string) => {
		storage().removeItem(makePath(storagePath, key));
	};

	return {
		getItem,
		setItem,
		removeItem,
	};
};
