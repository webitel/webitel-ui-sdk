import { watch } from 'vue';

import {
  PersistableValue,
  PersistedPropertyConfig,
  PersistedStorageController,
  PersistedStorageType,
} from './PersistedStorage.types.ts';
import { useLocalStoragePersistedStorage } from './useLocalStoragePersistedStorage.ts';
import { useRoutePersistedStorage } from './useRoutePersistedStorage.ts';

export const usePersistedStorage = ({
  name,
  value,
  storages: configStorages = [PersistedStorageType.Route],
  storagePath,
  startWatchManually = false,
  onStore,
  onRestore,
}: PersistedPropertyConfig): PersistedStorageController => {
  let unwatch = null;

  const setItemFns = [];
  const getItemFns: Array<(name: string) => Promise<PersistableValue>> = [];
  const removeItemFns = [];

  const composedValueGetter = async (name: string): Promise<PersistableValue[]> => {
    const settledResults = await Promise.allSettled(
      getItemFns.map((getter) => getter(name))
    );

    return settledResults.reduce((acc, result) => {
      if (result.status === 'fulfilled') {
        return [...acc, result.value];
      }
      return acc;
    }, []);
  };

  const storages = Array.isArray(configStorages)
    ? configStorages
    : [configStorages];

  /*
  order matters, as the first storage in the list has the highest priority
   */
  if (storages.includes(PersistedStorageType.Route)) {
    const { setItem, getItem, removeItem } = useRoutePersistedStorage();
    setItemFns.push(setItem);
    getItemFns.push(getItem);
    removeItemFns.push(removeItem);
  }

  if (storages.includes(PersistedStorageType.LocalStorage)) {
    const { setItem, getItem, removeItem } = useLocalStoragePersistedStorage({
      storagePath,
    });
    setItemFns.push(setItem);
    getItemFns.push(getItem);
    removeItemFns.push(removeItem);
  }

  const startWatch = () => {
    unwatch = watch(value, async () => {
      /*
       if onStore callback is provided,
        call custom logic for storing value
       */
      if (onStore) {
        /*
         wrap all setItemFns in one callback
          so that onStore is called only once on each value change
         */
        const save = async ({ name, value: storedValue }) => {
          setItemFns.forEach((setter) => {
            setter(name, storedValue);
          });
        };
        await onStore(save, { name, value });
      } else {
        /*
       else, perform default storing logic
       */
        const storedValue = value.value;
        setItemFns.forEach((setter) => {
          setter(name, storedValue);
        });
      }
    }, { deep: true });
  };

  const restore = async () => {
    /*
       if onRestore callback is provided,
        call custom logic for restoring value
       */
    if (onRestore) {
      /*
         wrap all getItemFns in one callback
          so that onRestore is called only once on each value change
         */
      const restore = async (name: string) => {
        const restoredValues = await composedValueGetter(name);
        /*
         not sure if value to restore should be picked automatically
          before running onRestore
         */
        return restoredValues.find((value) => {
          return value !== null && value !== undefined;
        });
      };
      await onRestore(restore, name);
    } else {
      /*
       else, perform default restoring logic
       */
      const restoredValues = await composedValueGetter(name);
      const restoredValue = restoredValues.find((value) => value !== null);

      if (restoredValue !== undefined) {
        value.value = restoredValue;
      }
    }
    /*
      start watching after restoring value to prevent restored value
       from storing again
     */
    if (!startWatchManually) {
      startWatch();
    }
  };

  const reset = async () => {
    await Promise.all(removeItemFns.map((removeItem) => removeItem(name)));
  };

  const endWatch = () => unwatch && unwatch();

  return {
    watch: startWatch,
    unwatch: endWatch,
    restore,
    reset,
  };
};
