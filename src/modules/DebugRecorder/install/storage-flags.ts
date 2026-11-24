// localStorage flags and the IndexedDB store: cleaning, emptying, leftovers of earlier versions
import { enabledUntil, LEGACY_PREFIX, STORAGE } from '../config';

export function safeLocalStorage(action: (storage: Storage) => void): void {
	try {
		action(localStorage);
	} catch {
		// storage blocked: nothing to persist or clean
	}
}

export function deleteDatabase(name: string): void {
	try {
		indexedDB.deleteDatabase(name);
	} catch {
		// IndexedDB unavailable: nothing was stored either
	}
}

// earlier, unreleased versions: the Workspace spike and the per-app stores
export function removeLegacyStores(): void {
	safeLocalStorage((s) => {
		for (const key of Object.keys(s)) {
			if (key.startsWith(LEGACY_PREFIX)) s.removeItem(key);
		}
	});
	try {
		if (typeof indexedDB.databases !== 'function') {
			deleteDatabase(LEGACY_PREFIX);
			return;
		}
		indexedDB
			.databases()
			.then((dbs) => {
				for (const { name } of dbs) {
					if (name?.startsWith(LEGACY_PREFIX)) deleteDatabase(name);
				}
			})
			.catch(() => {});
	} catch {
		// IndexedDB unavailable
	}
}

export function readItem(key: string): string | null {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}

// records left from an earlier recording period, while nothing is recording
export function clearStoredData(): void {
	safeLocalStorage((s) => {
		for (const key of Object.keys(s)) {
			if (key.startsWith(STORAGE.cleanExitPrefix)) s.removeItem(key);
		}
		s.removeItem(STORAGE.hasData);
		s.removeItem(STORAGE.owner);
		s.removeItem(STORAGE.endedAt);
	});
	deleteDatabase(STORAGE.db);
}

/** records are stored but nothing records into them any more: the archive of a stopped recording */
export function hasArchive(): boolean {
	return readItem(STORAGE.hasData) !== null && enabledUntil() === null;
}

// the stopped recording's records, read on the main thread (no worker runs then)
export async function readArchive<T>(
	read: (storage: import('../storage').RecorderStorage) => Promise<T>,
): Promise<T> {
	const { openStorage } = await import('../storage');
	const storage = await openStorage(STORAGE.db);
	try {
		return await read(storage);
	} finally {
		storage.close();
	}
}

// empties the store without deleting it, so other tabs keep recording into it
export async function clearStoreInPlace(): Promise<void> {
	const { openStorage } = await import('../storage');
	const storage = await openStorage(STORAGE.db);
	try {
		await storage.clear();
	} finally {
		storage.close();
	}
}
