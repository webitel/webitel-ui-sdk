import { useTableStoreConfig } from './tableStore.types';

export type Patch = Record<string, unknown> | Ref<unknown>;

export type Identifiable = { id: string; etag?: string };

export type StoreBody<T, G extends Identifiable> = (
  namespace: string,
  config: useTableStoreConfig<G>,
) => T;

export interface CreateDatalistStoreParams<T, Entity extends Identifiable> {
  namespace: string;
  config: useTableStoreConfig<Entity>;
  storeBody: StoreBody<T, Entity>;
}

export type StoreInstance = Record<string, unknown>;

export type PatchableStore<T extends StoreInstance> = T & {
  storePatch: (val: Patch) => void;
};
export type PatchableStoreFactory<T extends StoreInstance> =
  () => PatchableStore<T>;

export type ExtractedRefs<Entity> = {
  [Key in keyof Entity]: Ref<Entity[Key]>;
};
