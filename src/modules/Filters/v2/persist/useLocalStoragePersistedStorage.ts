import { StorageLike } from './PersistedStorage.types.ts';

const separator = ';';

const makePath = (storagePath: string, key: string) => `${storagePath}/${key}`;

export const useLocalStoragePersistedStorage = ({
  storagePath = '',
}: {
  storagePath: string;
}): StorageLike => {
  const getItem = async (key: string) => {
    const value = localStorage.getItem(makePath(storagePath, key));
    try {
      return value.split(separator).join();
    } catch {
      return value;
    }
  };

  const setItem = async (key: string, inputValue: string | string[]) => {
    const value = Array.isArray(inputValue)
      ? inputValue.join(separator)
      : inputValue;
    localStorage.setItem(makePath(storagePath, key), value);
  };

  const removeItem = async (key: string) => {
    localStorage.removeItem(makePath(storagePath, key));
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};
