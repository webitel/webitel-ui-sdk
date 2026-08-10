import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, type Ref, ref } from 'vue';

import {
	type PersistableValue,
	PersistedStorageType,
	type StorageLike,
} from '../PersistedStorage.types';

const createStorageMock = (): StorageLike & {
	value: string | null;
} => {
	const storage = {
		value: null as string | null,
		getItem: vi.fn(async () => storage.value),
		setItem: vi.fn(async (_key: string, value: string) => {
			storage.value = value;
		}),
		removeItem: vi.fn(async () => {
			storage.value = null;
		}),
	};

	return storage;
};

const routeStorage = createStorageMock();
const localStorage = createStorageMock();
const sessionStorage = createStorageMock();

/*
 route storage resolves `undefined` for a missing query param,
  the web ones resolve `null` – all are mocked to keep that difference
 */
vi.mock('../useRoutePersistedStorage', () => ({
	useRoutePersistedStorage: () => ({
		getItem: (key: string) =>
			routeStorage.getItem(key).then((value) => value ?? undefined),
		setItem: routeStorage.setItem,
		removeItem: routeStorage.removeItem,
	}),
}));

vi.mock('../useLocalStoragePersistedStorage', () => ({
	useLocalStoragePersistedStorage: () => localStorage,
}));

vi.mock('../useSessionStoragePersistedStorage', () => ({
	useSessionStoragePersistedStorage: () => sessionStorage,
}));

const { usePersistedStorage } = await import('../usePersistedStorage');

const storageMocks = {
	[PersistedStorageType.Route]: routeStorage,
	[PersistedStorageType.LocalStorage]: localStorage,
	[PersistedStorageType.SessionStorage]: sessionStorage,
};

const storageKinds = Object.values(PersistedStorageType).map((type) => ({
	type,
	storage: storageMocks[type],
}));

describe('usePersistedStorage', () => {
	beforeEach(() => {
		Object.values(storageMocks).forEach((storage) => {
			storage.value = null;
		});
		vi.clearAllMocks();
	});

	/* every kind has to take part in all of it, so every enum member is run */
	describe.each(storageKinds)('$type storage', ({ type, storage }) => {
		it('is restored from', async () => {
			storage.value = 'stored';
			const value = ref('');

			await usePersistedStorage({
				name: 'filters',
				value,
				storages: [
					type,
				],
			}).restore();

			expect(value.value).toBe('stored');
		});

		it('is written to by the watcher', async () => {
			const value = ref('initial');

			await usePersistedStorage({
				name: 'filters',
				value,
				storages: [
					type,
				],
			}).restore();

			value.value = 'changed';
			await nextTick();

			expect(storage.value).toBe('changed');
		});

		it('is published into by sync when it holds nothing', async () => {
			const value = ref('filtered');

			await usePersistedStorage({
				name: 'filters',
				value,
				storages: [
					type,
				],
			}).sync();

			expect(storage.value).toBe('filtered');
		});

		it('is left untouched by sync when it already holds a value', async () => {
			storage.value = 'stored';

			await usePersistedStorage({
				name: 'filters',
				value: ref('from-memory'),
				storages: [
					type,
				],
			}).sync();

			expect(storage.setItem).not.toHaveBeenCalled();
			expect(storage.value).toBe('stored');
		});

		it('is cleared by reset', async () => {
			storage.value = 'stored';

			await usePersistedStorage({
				name: 'filters',
				value: ref('from-memory'),
				storages: [
					type,
				],
			}).reset();

			expect(storage.value).toBeNull();
		});
	});

	describe('sync', () => {
		it('publishes the current value to an empty storage', async () => {
			const value = ref('filtered');

			await usePersistedStorage({
				name: 'filters',
				value,
			}).sync();

			expect(routeStorage.setItem).toHaveBeenCalledWith('filters', 'filtered');
			expect(routeStorage.value).toBe('filtered');
		});

		it('does not overwrite a storage that already holds a value', async () => {
			routeStorage.value = 'from-url';
			const value = ref('from-memory');

			await usePersistedStorage({
				name: 'filters',
				value,
			}).sync();

			expect(routeStorage.setItem).not.toHaveBeenCalled();
			expect(routeStorage.value).toBe('from-url');
		});

		it('publishes only to the storages that hold nothing', async () => {
			localStorage.value = 'from-local-storage';
			const value = ref('from-memory');

			await usePersistedStorage({
				name: 'fields',
				value,
				storages: [
					PersistedStorageType.Route,
					PersistedStorageType.LocalStorage,
				],
			}).sync();

			expect(routeStorage.value).toBe('from-memory');
			expect(localStorage.setItem).not.toHaveBeenCalled();
			expect(localStorage.value).toBe('from-local-storage');
		});

		it('skips empty values', async () => {
			const value = ref('');

			await usePersistedStorage({
				name: 'filters',
				value,
			}).sync();

			expect(routeStorage.setItem).not.toHaveBeenCalled();
			expect(routeStorage.value).toBeNull();
		});

		it('skips a value still equal to the default captured by restore', async () => {
			const value = ref('default-page');

			const storage = usePersistedStorage({
				name: 'page',
				value,
			});
			await storage.restore();
			await storage.sync();

			expect(routeStorage.setItem).not.toHaveBeenCalled();
			expect(routeStorage.value).toBeNull();
		});

		it('publishes a value changed after restore', async () => {
			const value = ref('default-page');

			const storage = usePersistedStorage({
				name: 'page',
				value,
			});
			await storage.restore();
			storage.unwatch();
			value.value = '3';
			await storage.sync();

			expect(routeStorage.value).toBe('3');
		});

		it('captures the default through onStore serialization', async () => {
			const filters = ref<Record<string, string>>({});

			const storage = usePersistedStorage({
				name: 'filters',
				value: filters as unknown as Ref<PersistableValue>,
				onStore: (save, { name }) =>
					save({
						name,
						value: JSON.stringify(filters.value),
					}),
			});
			await storage.restore();
			storage.unwatch();

			/* an empty snapshot serializes to "{}" – the default, nothing to publish */
			await storage.sync();
			expect(routeStorage.setItem).not.toHaveBeenCalled();

			filters.value = {
				name: 'test',
			};
			await storage.sync();
			expect(routeStorage.value).toBe('{"name":"test"}');
		});

		it('skips empty values when restore never ran', async () => {
			const value = ref('');

			await usePersistedStorage({
				name: 'filters',
				value,
			}).sync();

			expect(routeStorage.setItem).not.toHaveBeenCalled();
		});

		it('stores value serialized by onStore', async () => {
			const value = ref('ignored-raw-value');

			await usePersistedStorage({
				name: 'filters',
				value,
				onStore: (save, { name }) =>
					save({
						name,
						value: 'serialized',
					}),
			}).sync();

			expect(routeStorage.value).toBe('serialized');
		});

		it('does not start watching the value', async () => {
			const value = ref('filtered');

			await usePersistedStorage({
				name: 'filters',
				value,
			}).sync();

			vi.clearAllMocks();
			value.value = 'changed';
			await new Promise((resolve) => setTimeout(resolve));

			expect(routeStorage.setItem).not.toHaveBeenCalled();
		});
	});

	describe('restore', () => {
		it('falls back to the next storage when the route holds nothing', async () => {
			localStorage.value = 'from-local-storage';
			const value = ref('');

			await usePersistedStorage({
				name: 'fields',
				value,
				storages: [
					PersistedStorageType.Route,
					PersistedStorageType.LocalStorage,
				],
			}).restore();

			expect(value.value).toBe('from-local-storage');
		});

		it('follows the declared order, not the order the kinds are defined in', async () => {
			routeStorage.value = 'from-url';
			localStorage.value = 'from-local-storage';
			const value = ref('');

			await usePersistedStorage({
				name: 'fields',
				value,
				storages: [
					PersistedStorageType.LocalStorage,
					PersistedStorageType.Route,
				],
			}).restore();

			expect(value.value).toBe('from-local-storage');
		});

		it('restores from the third storage when the first two hold nothing', async () => {
			sessionStorage.value = 'from-session-storage';
			const value = ref('');

			await usePersistedStorage({
				name: 'fields',
				value,
				storages: [
					PersistedStorageType.Route,
					PersistedStorageType.LocalStorage,
					PersistedStorageType.SessionStorage,
				],
			}).restore();

			expect(value.value).toBe('from-session-storage');
		});

		it('prefers the route value over the next storages', async () => {
			routeStorage.value = 'from-url';
			localStorage.value = 'from-local-storage';
			const value = ref('');

			await usePersistedStorage({
				name: 'fields',
				value,
				storages: [
					PersistedStorageType.Route,
					PersistedStorageType.LocalStorage,
				],
			}).restore();

			expect(value.value).toBe('from-url');
		});

		it('leaves the value untouched when no storage holds anything', async () => {
			const value = ref('in-memory');

			await usePersistedStorage({
				name: 'fields',
				value,
			}).restore();

			expect(value.value).toBe('in-memory');
		});

		it('hands the first non-null value to onRestore', async () => {
			localStorage.value = 'from-local-storage';
			const onRestore = vi.fn();

			await usePersistedStorage({
				name: 'fields',
				value: ref(''),
				storages: [
					PersistedStorageType.Route,
					PersistedStorageType.LocalStorage,
				],
				onRestore: async (restore, name) => {
					onRestore(await restore(name));
				},
			}).restore();

			expect(onRestore).toHaveBeenCalledWith('from-local-storage');
		});
	});

	describe('watch', () => {
		it('writes a changed value to every storage', async () => {
			const value = ref('initial');

			await usePersistedStorage({
				name: 'fields',
				value,
				storages: [
					PersistedStorageType.Route,
					PersistedStorageType.LocalStorage,
				],
			}).restore();

			value.value = 'changed';
			await nextTick();

			expect(routeStorage.value).toBe('changed');
			expect(localStorage.value).toBe('changed');
		});

		it('does not write the value restored from a storage back', async () => {
			routeStorage.value = 'from-url';

			await usePersistedStorage({
				name: 'filters',
				value: ref(''),
			}).restore();
			await nextTick();

			expect(routeStorage.setItem).not.toHaveBeenCalled();
		});

		it('does not start watching when startWatchManually is set', async () => {
			const value = ref('initial');

			await usePersistedStorage({
				name: 'filters',
				value,
				startWatchManually: true,
			}).restore();

			value.value = 'changed';
			await nextTick();

			expect(routeStorage.setItem).not.toHaveBeenCalled();
		});

		it('stops writing after unwatch', async () => {
			const value = ref('initial');

			const storage = usePersistedStorage({
				name: 'filters',
				value,
			});
			await storage.restore();
			storage.unwatch();

			value.value = 'changed';
			await nextTick();

			expect(routeStorage.setItem).not.toHaveBeenCalled();
		});
	});

	describe('reset', () => {
		it('removes the value from every storage', async () => {
			routeStorage.value = 'from-url';
			localStorage.value = 'from-local-storage';

			await usePersistedStorage({
				name: 'fields',
				value: ref('in-memory'),
				storages: [
					PersistedStorageType.Route,
					PersistedStorageType.LocalStorage,
				],
			}).reset();

			expect(routeStorage.value).toBeNull();
			expect(localStorage.value).toBeNull();
		});
	});
});
