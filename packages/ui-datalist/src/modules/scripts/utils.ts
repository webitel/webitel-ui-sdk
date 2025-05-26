import type { Store } from 'pinia';
import { isRef, Ref, ref, unref } from 'vue';

import { Patch, StoreInstance } from '../types/createDatalistStore.types';

/**
 * the applyStorePatch method is used to repeat the logic of the $patch method from pinia for the composable stores
 * */
export const applyStorePatch = <StoreBody extends StoreInstance>(
  store: StoreBody | Store,
  patch: Patch,
) => {
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
