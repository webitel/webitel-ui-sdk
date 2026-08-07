import { beforeEach, describe, expect, it } from 'vitest';

import { useLocalStoragePersistedStorage } from '../useLocalStoragePersistedStorage';

describe('useLocalStoragePersistedStorage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('namespaces keys with the storagePath', async () => {
		const storage = useLocalStoragePersistedStorage({
			storagePath: 'cases/headers',
		});

		await storage.setItem('fields', 'name,subject');

		expect(localStorage.getItem('cases/headers/fields')).toBe('name,subject');
	});

	it('keeps stores with different paths apart', async () => {
		const cases = useLocalStoragePersistedStorage({
			storagePath: 'cases',
		});
		const contacts = useLocalStoragePersistedStorage({
			storagePath: 'contacts',
		});

		await cases.setItem('fields', 'subject');
		await contacts.setItem('fields', 'name');

		expect(await cases.getItem('fields')).toBe('subject');
		expect(await contacts.getItem('fields')).toBe('name');
	});

	it('resolves null for a missing key', async () => {
		const storage = useLocalStoragePersistedStorage({
			storagePath: 'cases',
		});

		expect(await storage.getItem('fields')).toBeNull();
	});

	it('stores an array as a comma-joined value', async () => {
		const storage = useLocalStoragePersistedStorage({
			storagePath: 'cases',
		});

		await storage.setItem('fields', [
			'name',
			'subject',
		]);

		expect(await storage.getItem('fields')).toBe('name,subject');
	});

	it('removes a key', async () => {
		const storage = useLocalStoragePersistedStorage({
			storagePath: 'cases',
		});
		await storage.setItem('fields', 'name');

		await storage.removeItem('fields');

		expect(await storage.getItem('fields')).toBeNull();
	});
});
