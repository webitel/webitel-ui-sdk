import type { Ref, WatchOptions } from 'vue';

export enum PersistedStorageType {
	LocalStorage = 'localStorage',
	Route = 'route',
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
	reset: () => Promise<void>;
}
