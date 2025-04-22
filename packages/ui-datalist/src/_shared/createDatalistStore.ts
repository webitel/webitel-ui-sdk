import {
  defineStore as definePiniaStore,
  storeToRefs as piniaStoreToRefs,
} from 'pinia';
import { toRefs as composableStoreToRefs } from 'vue';

import { DatalistStoreProviderType } from '../types/StoreProvider';
import { TableStore, useTableStoreConfig } from '../types/tableStore.types';

const defaultStoreType = DatalistStoreProviderType.Composable;

export const makeThisToRefs = (
  storeType: DatalistStoreProviderType,
): piniaStoreToRefs | composableStoreToRefs => {
  if (storeType === DatalistStoreProviderType.Composable) {
    return composableStoreToRefs;
  }

  if (storeType === DatalistStoreProviderType.Pinia) {
    return piniaStoreToRefs;
  }
};

export const createDatalistStore =
  (storeBody) =>
  <Entity extends { id: string; etag?: string }>(
    namespace: string,
    config: useTableStoreConfig<Entity>,
  ): TableStore<Entity> => {
    const thisStoreType = config.storeType || defaultStoreType;

    if (thisStoreType === DatalistStoreProviderType.Composable) {
      return storeBody<Entity>(namespace, {
        ...config,
        storeType: thisStoreType,
      })();
    }

    if (thisStoreType === DatalistStoreProviderType.Pinia) {
      return definePiniaStore(
        namespace,
        storeBody<Entity>(namespace, { ...config, storeType: thisStoreType }),
      )();
    }
  };
