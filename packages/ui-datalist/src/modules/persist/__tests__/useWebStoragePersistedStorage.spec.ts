import { beforeEach, describe, expect, it } from 'vitest';

import { useLocalStoragePersistedStorage } from '../useLocalStoragePersistedStorage';
import { useSessionStoragePersistedStorage } from '../useSessionStoragePersistedStorage';

const webStorages = [
	{
		name: 'useLocalStoragePersistedStorage',
		useStorage: useLocalStoragePersistedStorage,
		nativeStorage: () => localStorage,
	},
	{
		name: 'useSessionStoragePersistedStorage',
		useStorage: useSessionStoragePersistedStorage,
		nativeStorage: () => sessionStorage,
	},
];

describe.each(webStorages)('$name', ({ useStorage, nativeStorage }) => {
	beforeEach(() => {
		localStorage.clear();
		sessionStorage.clear();
	});

	it('namespaces keys with the storagePath', async () => {
		const storage = useStorage({
			storagePath: 'cases/headers',
		});

		await storage.setItem('fields', 'name,subject');

		expect(nativeStorage().getItem('cases/headers/fields')).toBe(
			'name,subject',
		);
	});

	it('keeps stores with different paths apart', async () => {
		const cases = useStorage({
			storagePath: 'cases',
		});
		const contacts = useStorage({
			storagePath: 'contacts',
		});

		await cases.setItem('fields', 'subject');
		await contacts.setItem('fields', 'name');

		expect(await cases.getItem('fields')).toBe('subject');
		expect(await contacts.getItem('fields')).toBe('name');
	});

	it('resolves null for a missing key', async () => {
		const storage = useStorage({
			storagePath: 'cases',
		});

		expect(await storage.getItem('fields')).toBeNull();
	});

	it('stores an array as a comma-joined value', async () => {
		const storage = useStorage({
			storagePath: 'cases',
		});

		await storage.setItem('fields', [
			'name',
			'subject',
		]);

		expect(await storage.getItem('fields')).toBe('name,subject');
	});

	it('removes a key', async () => {
		const storage = useStorage({
			storagePath: 'cases',
		});
		await storage.setItem('fields', 'name');

		await storage.removeItem('fields');

		expect(await storage.getItem('fields')).toBeNull();
	});
});

describe('web storages isolation', () => {
	beforeEach(() => {
		localStorage.clear();
		sessionStorage.clear();
	});

	it('does not let the two kinds see each other values', async () => {
		const local = useLocalStoragePersistedStorage({
			storagePath: 'cases',
		});
		const session = useSessionStoragePersistedStorage({
			storagePath: 'cases',
		});

		await local.setItem('filters', 'from-local-storage');

		expect(await session.getItem('filters')).toBeNull();

		await session.setItem('filters', 'from-session-storage');

		expect(await local.getItem('filters')).toBe('from-local-storage');
	});
});
