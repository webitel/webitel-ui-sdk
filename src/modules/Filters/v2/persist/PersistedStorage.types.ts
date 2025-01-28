import { Ref, WatchOptions } from 'vue';

export enum PersistedStorageType {
  LocalStorage = 'localStorage',
  Route = 'route',
}

// in route query, or in localStorage
export type PersistStorableValue = string;

export type PersistableValue =
  | PersistStorableValue
  | { toString: () => PersistStorableValue };

export interface StorageLike {
  getItem(key: string): Promise<PersistableValue | null>;

  setItem(key: string, value: PersistableValue): Promise<void>;

  removeItem(key: string): Promise<void>;
}

export interface PersistedPropertyConfig {
  name: string;
  value: Ref<PersistableValue>;
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
    { value, name },
  ) => Promise<void>;
  onRestore?: (
    restore: (name: string) => Promise<PersistableValue>,
    name: string,
  ) => Promise<void>;
}

export interface PersistedStorageController {
  watch: () => void;
  unwatch: () => void;
  restore: () => Promise<void>;
  reset: () => Promise<void>;
}
