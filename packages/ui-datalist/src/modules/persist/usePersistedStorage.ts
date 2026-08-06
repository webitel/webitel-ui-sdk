import { type WatchHandle, watch } from 'vue';

import {
	type PersistableValue,
	type PersistedPropertyConfig,
	type PersistedStorageAdapter,
	type PersistedStorageController,
	PersistedStorageType,
	type PersistStorableValue,
} from './PersistedStorage.types';
import { useLocalStoragePersistedStorage } from './useLocalStoragePersistedStorage';
import { useRoutePersistedStorage } from './useRoutePersistedStorage';

const toStorableValue = (value: PersistableValue): PersistStorableValue => {
	return typeof value === 'string' ? value : (value?.toString() ?? '');
};

const isEmptyValueByDefault = (value: PersistStorableValue) => {
	return value == null || value === '';
};

export const usePersistedStorage = ({
	name,
	value,
	storages: configStorages = [
		PersistedStorageType.Route,
	],
	storagePath,
	startWatchManually = false,
	isEmptyValue = isEmptyValueByDefault,
	onStore,
	onRestore,
}: PersistedPropertyConfig): PersistedStorageController => {
	let unwatch: WatchHandle | null = null;

	const adapters: PersistedStorageAdapter[] = [];

	// `null` entries are kept: callers below pick the first non-null value, so the
	// per-storage misses have to stay in the list to preserve priority order.
	const composedValueGetter = async (
		name: string,
	): Promise<Array<PersistableValue | null>> => {
		const settledResults = await Promise.allSettled(
			adapters.map(({ getItem }) => getItem(name)),
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
		adapters.push({
			type: PersistedStorageType.Route,
			...useRoutePersistedStorage(),
		});
	}

	if (storages.includes(PersistedStorageType.LocalStorage)) {
		adapters.push({
			type: PersistedStorageType.LocalStorage,
			...useLocalStoragePersistedStorage({
				storagePath,
			}),
		});
	}

	/*
   single storing path, shared by the watcher and by sync():
    the watcher writes to every storage, sync() writes only to the empty ones
   */
	const store = async ({
		targets,
		skipEmpty = false,
	}: {
		targets: PersistedStorageAdapter[];
		skipEmpty?: boolean;
	}) => {
		if (!targets.length) return;

		const save = async ({
			name,
			value: storedValue,
		}: {
			name: string;
			value: PersistableValue;
		}) => {
			if (skipEmpty && isEmptyValue(toStorableValue(storedValue))) return;

			await Promise.all(
				targets.map((adapter) => adapter.setItem(name, storedValue)),
			);
		};

		/*
     if onStore callback is provided,
      call custom logic for storing value
     */
		if (onStore) {
			/*
       save is wrapped in one callback,
        so that onStore is called only once on each value change
       */
			await onStore(save, {
				name,
				value: value.value ?? '',
			});
		} else {
			/*
       else, perform default storing logic
       */
			await save({
				name,
				value: value.value ?? '',
			});
		}
	};

	const startWatch = () => {
		unwatch = watch(
			value,
			() => {
				store({
					targets: adapters,
				});
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
			/*
       loose check on purpose: useRoutePersistedStorage resolves `undefined`
        for a missing query param, so a storage listed after the route one
        would never win with a strict `!== null`
       */
			const restoredValue = restoredValues.find((value) => value != null);

			if (restoredValue != null) {
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

	const sync = async () => {
		const settledResults = await Promise.allSettled(
			adapters.map(({ getItem }) => getItem(name)),
		);

		const emptyStorages = adapters.filter((_, index) => {
			const result = settledResults[index];
			return result.status === 'fulfilled' && result.value == null;
		});

		return store({
			targets: emptyStorages,
			skipEmpty: true,
		});
	};

	const reset = async () => {
		await Promise.all(adapters.map(({ removeItem }) => removeItem(name)));
	};

	const endWatch = () => unwatch?.();

	return {
		watch: startWatch,
		unwatch: endWatch,
		restore,
		sync,
		reset,
	};
};
