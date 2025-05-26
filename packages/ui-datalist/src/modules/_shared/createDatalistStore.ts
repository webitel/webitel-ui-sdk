import type { Store } from 'pinia';
import {
  defineStore as definePiniaStore,
  StoreGeneric,
  storeToRefs as piniaStoreToRefs,
} from 'pinia';
import {
  isRef,
  Ref,
  ref,
  ToRefs,
  toRefs as composableStoreToRefs,
  unref,
} from 'vue';

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

/**
 * applyStorePatch is used to replace the $patch method,
 * that is available in pinia, but not available in the composable stores.
 * */
const applyStorePatch = <StoreBody extends StoreInstance>(
  store: StoreBody | Store,
  patch: Patch,
  storeType: DatalistStoreProviderType,
) => {
  if (storeType === DatalistStoreProvider.Pinia) {
    (store as Store).$patch?.(patch);
    return;
  }

  for (const key of Object.keys(patch)) {
    const value = patch[key];
    const target = store[key];

    if (isRef(target)) {
      (target as Ref<unknown>).value = isRef(value) ? unref(value) : value;
    } else {
      (store as Record<string, unknown>)[key] = isRef(value)
        ? value
        : ref(value);
    }
  }
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

  const storeFactory = storeBody(namespace, {
    ...config,
    storeType: thisStoreType,
  }) as PatchableStore<StoreBody>;

  if (thisStoreType === DatalistStoreProvider.Composable) {
    storeFactory.storePatch = (val: Patch) =>
      applyStorePatch(storeFactory, val, thisStoreType);
    return () => storeFactory;
  }

  if (thisStoreType === DatalistStoreProvider.Pinia) {
    const piniaStore = definePiniaStore(namespace, () => storeFactory);

    return () => {
      const instance = piniaStore() as PatchableStore<StoreBody>;
      instance.storePatch = (val: Patch) =>
        applyStorePatch(instance, val, thisStoreType);
      return instance;
    };
  }

  throw new Error(`Unsupported store type: ${thisStoreType}`);
};
