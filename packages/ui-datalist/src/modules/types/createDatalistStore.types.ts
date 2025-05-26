import { Ref } from 'vue';

import { useTableStoreConfig } from './tableStore.types';

/**
 * this type is used to define the value that is used in the applyStorePatch method,
 * which can be as primitive object or as reactive object.
 * */
export type Patch = Record<string, unknown> | Ref<unknown>;

export type Identifiable = { id: string; etag?: string };

export type StoreInstance = Record<string, unknown>;

/**
 * StoreBody is a composite with a set of data and store methods
 * */
export type StoreBody<T extends StoreInstance, G extends Identifiable> = (
  config: useTableStoreConfig<G>,
) => T;

export interface CreateDatalistStoreParams<
  T extends StoreInstance,
  Entity extends Identifiable,
> {
  namespace: string;
  config: useTableStoreConfig<Entity>;
  storeBody: StoreBody<T, Entity>;
}

/**
 * PatchableStore is needed to indicate that the store we are using also has a storePatch method (previously $patch)
 * */
export type PatchableStore<T extends StoreInstance> = T & {
  $patch: (val: Patch) => void;
};
export type PatchableStoreFactory<T extends StoreInstance> =
  () => PatchableStore<T>;
