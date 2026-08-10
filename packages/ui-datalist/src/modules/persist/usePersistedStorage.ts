import { isEmpty } from '@webitel/ui-sdk/scripts';
import { type WatchHandle, watch } from 'vue';

import {
	type PersistableValue,
	type PersistedPropertyConfig,
	type PersistedStorageAdapter,
	type PersistedStorageController,
	PersistedStorageType,
	type PersistStorableValue,
	type StorageLike,
} from './PersistedStorage.types';
import { useLocalStoragePersistedStorage } from './useLocalStoragePersistedStorage';
import { useRoutePersistedStorage } from './useRoutePersistedStorage';
import { useSessionStoragePersistedStorage } from './useSessionStoragePersistedStorage';

const toStorableValue = (value: PersistableValue): PersistStorableValue => {
	return typeof value === 'string' ? value : (value?.toString() ?? '');
};

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
	let defaultSnapshot: PersistStorableValue | undefined;

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
   keyed by the enum on purpose: a storage kind added without an adapter
    becomes a type error, instead of silently taking part in nothing
   */
	const adapterFactories: Record<PersistedStorageType, () => StorageLike> = {
		[PersistedStorageType.Route]: () => useRoutePersistedStorage(),
		[PersistedStorageType.LocalStorage]: () =>
			useLocalStoragePersistedStorage({
				storagePath,
			}),
		[PersistedStorageType.SessionStorage]: () =>
			useSessionStoragePersistedStorage({
				storagePath,
			}),
	};

	/*
  order matters, as the first storage in the list has the highest priority
   */
	storages.forEach((type) => {
		if (adapters.some((adapter) => adapter.type === type)) return;

		adapters.push({
			type,
			...adapterFactories[type](),
		});
	});

	/*
   runs the storing path with a `save` doing whatever the caller needs:
    writing to the storages, or merely capturing the serialized value
   */
	const runStoringPath = async (
		save: (params: { name: string; value: PersistableValue }) => Promise<void>,
	) => {
		if (onStore) {
			/* save is wrapped in one callback, so that onStore is called only once */
			return onStore(save, {
				name,
				value: value.value ?? '',
			});
		}

		return save({
			name,
			value: value.value ?? '',
		});
	};

	const serialize = async () => {
		let serializedValue: PersistStorableValue = '';

		await runStoringPath(async ({ value: storedValue }) => {
			serializedValue = toStorableValue(storedValue);
		});

		return serializedValue;
	};

	const store = (targets: PersistedStorageAdapter[]) => {
		if (!targets.length) return Promise.resolve();

		return runStoringPath(async ({ name, value: storedValue }) => {
			await Promise.all(
				targets.map((adapter) => adapter.setItem(name, storedValue)),
			);
		});
	};

	const startWatch = () => {
		unwatch = watch(
			value,
			() => {
				store(adapters);
			},
			{
				deep: true,
			},
		);
	};

	const restore = async () => {
		/*
     nothing has mutated the value yet, so this is what a freshly created store
      serializes – sync() uses it to tell untouched state from a real one
     */
		defaultSnapshot = await serialize();

		if (onRestore) {
			/* every getter is wrapped in one callback, so that onRestore is called only once */
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
		const serializedValue = await serialize();

		if (isEmpty(serializedValue) || serializedValue === defaultSnapshot) return;

		const settledResults = await Promise.allSettled(
			adapters.map(({ getItem }) => getItem(name)),
		);

		const emptyStorages = adapters.filter((_, index) => {
			const result = settledResults[index];
			return result.status === 'fulfilled' && result.value == null;
		});

		return store(emptyStorages);
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
