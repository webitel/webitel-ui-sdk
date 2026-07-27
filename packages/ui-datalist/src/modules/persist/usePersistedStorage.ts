import { type WatchHandle, watch } from 'vue';

import {
	type PersistableValue,
	type PersistedPropertyConfig,
	type PersistedStorageController,
	PersistedStorageType,
	type StorageLike,
} from './PersistedStorage.types';
import { useLocalStoragePersistedStorage } from './useLocalStoragePersistedStorage';
import { useRoutePersistedStorage } from './useRoutePersistedStorage';

export const usePersistedStorage = ({
	name,
	value,
	storages: configStorages = [
		PersistedStorageType.Route,
	],
	storagePath,
	startWatchManually = false,
	onStore,
	onRestore,
}: PersistedPropertyConfig): PersistedStorageController => {
	let unwatch: WatchHandle | null = null;

	const setItemFns: StorageLike['setItem'][] = [];
	const getItemFns: StorageLike['getItem'][] = [];
	const removeItemFns: StorageLike['removeItem'][] = [];

	// `null` entries are kept: callers below pick the first non-null value, so the
	// per-storage misses have to stay in the list to preserve priority order.
	const composedValueGetter = async (
		name: string,
	): Promise<Array<PersistableValue | null>> => {
		const settledResults = await Promise.allSettled(
			getItemFns.map((getter) => getter(name)),
		);

		return settledResults.reduce(
			(acc, result) => {
				if (result.status === 'fulfilled') {
					acc.push(result.value);
				}
				return acc;
			},
			[] as Array<PersistableValue | null>,
		);
	};

	const storages = Array.isArray(configStorages)
		? configStorages
		: [
				configStorages,
			];

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
		unwatch = watch(
			value,
			async () => {
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
					await onStore(save, {
						name,
						value,
					});
				} else {
					/*
       else, perform default storing logic
       */
					const storedValue = value.value;
					setItemFns.forEach((setter) => {
						setter(name, storedValue);
					});
				}
			},
			{
				deep: true,
			},
		);
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
					return value != null;
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

	const endWatch = () => unwatch?.();

	return {
		watch: startWatch,
		unwatch: endWatch,
		restore,
		reset,
	};
};
