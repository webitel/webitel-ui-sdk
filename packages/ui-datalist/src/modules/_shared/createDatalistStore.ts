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
  DatalistStoreProvider,
  DatalistStoreProviderType,
} from '../types/StoreProvider';
import { useTableStoreConfig } from '../types/tableStore.types';

type Patch = object | Ref;

type Identifiable = { id: string; etag?: string };

type StoreConfig<T extends Identifiable> = useTableStoreConfig<T> & {
  storeType?: DatalistStoreProviderType;
};

type StoreBody<T, G extends Identifiable> = (
  namespace: string,
  config: StoreConfig<G>,
) => T;

interface CreateDatalistStoreParams<T, G extends Identifiable> {
  namespace: string;
  config: StoreConfig<G>;
  storeBody: StoreBody<T, G>;
}

const defaultStoreType = DatalistStoreProvider.Composable;

export const makeThisToRefs = <T>(
  store: T,
  storeType: DatalistStoreProviderType,
): T extends StoreGeneric ? typeof piniaStoreToRefs<T> : ToRefs<T> => {
  const thisStoreType = storeType || defaultStoreType;

  if (thisStoreType === DatalistStoreProvider.Pinia) {
    return piniaStoreToRefs(store as StoreGeneric);
  }
  return composableStoreToRefs(store as object);
};

export function applyPatch<T extends object>(
  store: T,
  patch: Patch,
  storeType: DatalistStoreProviderType,
) {
  if (storeType === DatalistStoreProvider.Pinia) {
    (store as Store).$patch?.(patch);
  } else {
    for (const key in patch) {
      const value = patch[key];
      const target = store[key];

      if (isRef(target)) {
        target.value = isRef(value) ? unref(value) : value;
      } else {
        (store as T)[key] = isRef(value) ? value : ref(value);
      }
    }
  }
}

export const createDatalistStore = <T, G extends Identifiable>({
  config,
  namespace,
  storeBody,
}: CreateDatalistStoreParams<T, G>): (() => T) => {
  const thisStoreType = config.storeType || defaultStoreType;

  const storeFactory = storeBody(namespace, {
    ...config,
    storeType: thisStoreType,
  });

  if (thisStoreType === DatalistStoreProvider.Composable) {
    return () => storeFactory;
  }

  if (thisStoreType === DatalistStoreProvider.Pinia) {
    return definePiniaStore(namespace, () => storeFactory);
  }

  throw new Error(`Unsupported store type: ${thisStoreType}`);
};
