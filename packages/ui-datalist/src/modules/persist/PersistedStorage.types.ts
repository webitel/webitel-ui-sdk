import type { Ref, WatchOptions } from 'vue';

export enum PersistedStorageType {
	LocalStorage = 'localStorage',
	Route = 'route',
	SessionStorage = 'sessionStorage',
}

// in route query, or in localStorage
export type PersistStorableValue = string;

export type PersistableValue =
	| PersistStorableValue
	| {
			toString: () => PersistStorableValue;
	  };

export interface StorageLike {
	getItem(key: string): Promise<PersistableValue | null>;

	setItem(key: string, value: PersistableValue): Promise<void>;

	removeItem(key: string): Promise<void>;
}

export interface PersistedStorageAdapter extends StorageLike {
	type: PersistedStorageType;
}

export interface PersistedPropertyConfig {
	name: string;
	// note: createTableHeadersStore passes a computed here, which the default
	// restore path cannot write to
	value: Ref<PersistableValue | null>;
	storages?: PersistedStorageType | PersistedStorageType[];
	storagePath?: string;
	startWatchManually?: boolean;
	watchConfig?: WatchOptions;
	onStore?: (
		save: ({
			name,
			value,
		}: {
			name: string;
			value: PersistableValue;
		}) => Promise<void>,
		context: {
			name: string;
			value: PersistableValue;
		},
	) => Promise<void>;
	onRestore?: (
		// resolves `undefined` when no storage held a value for `name`
		restore: (name: string) => Promise<PersistableValue | undefined>,
		name: string,
	) => Promise<void>;
}

export interface PersistedStorageController {
	watch: () => void;
	unwatch: () => void;
	restore: () => Promise<void>;
	/**
	 * Publishes the current value to every storage that holds nothing for `name`.
	 * Storages that already hold a value are left untouched, so an explicit route
	 * query always wins over in-memory state.
	 *
	 * A no-op for state still equal to the defaults: `restore()` captures the
	 * snapshot a freshly created store serializes, and a controller that never
	 * restored can only tell empty values apart.
	 */
	sync: () => Promise<void>;
	reset: () => Promise<void>;
}
