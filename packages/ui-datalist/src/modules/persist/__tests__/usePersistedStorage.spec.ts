import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Ref, ref } from 'vue';

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

/*
 route storage resolves `undefined` for a missing query param,
  local storage resolves `null` – both are mocked to keep that difference
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

const { usePersistedStorage } = await import('../usePersistedStorage');

describe('usePersistedStorage', () => {
	beforeEach(() => {
		routeStorage.value = null;
		localStorage.value = null;
		vi.clearAllMocks();
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
	});
});
