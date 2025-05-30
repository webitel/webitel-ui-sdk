import {
  defineStore as definePiniaStore,
  StoreGeneric,
  storeToRefs as piniaStoreToRefs,
} from 'pinia';
import { ToRefs, toRefs as composableStoreToRefs } from 'vue';

import { applyStorePatch } from '../scripts/utils';
import {
  CreateDatalistStoreParams,
  Identifiable,
  Patch,
  PatchableStore,
  PatchableStoreFactory,
  StoreInstance,
} from '../types/createDatalistStore.types';
import {
  DatalistStoreProvider,
  DatalistStoreProviderType,
} from '../types/StoreProvider';

const defaultStoreType = DatalistStoreProvider.Pinia;

/**
 * makeThisToRefs converts a store object into a set of reactive references (toRefs),
 * using Pinia's storeToRefs if it's a Pinia store, or Vue's toRefs for composable stores.
 * */
export const makeThisToRefs = <StoreBody extends object>(
  store: StoreBody,
  storeType: DatalistStoreProviderType,
): ToRefs<StoreBody> => {
  const thisStoreType = storeType || defaultStoreType;

  if (thisStoreType === DatalistStoreProvider.Pinia) {
    return piniaStoreToRefs(store as StoreGeneric) as ToRefs<StoreBody>;
  }

  return composableStoreToRefs(store) as ToRefs<StoreBody>;
};

export const createDatalistStore = <
  StoreBody extends StoreInstance,
  G extends Identifiable,
>({
  config,
  namespace,
  storeBody,
}: CreateDatalistStoreParams<
  StoreBody,
  G
>): PatchableStoreFactory<StoreBody> => {
  const thisStoreType = config.storeType || defaultStoreType;

  if (thisStoreType === DatalistStoreProvider.Composable) {
    const storeFactory = storeBody({
      ...config,
      storeType: thisStoreType,
    }) as PatchableStore<StoreBody>;
    storeFactory.$patch = (val: Patch) => applyStorePatch(storeFactory, val);
    return () => storeFactory;
  }

  if (thisStoreType === DatalistStoreProvider.Pinia) {
    return definePiniaStore(namespace, () =>
      storeBody({
        ...config,
        storeType: thisStoreType,
      }),
    );
  }

  throw new Error(`Unsupported store type: ${thisStoreType}`);
};
