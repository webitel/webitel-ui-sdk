import { refDebounced } from '@vueuse/core';
import {computed,MaybeRef, Ref} from 'vue';

export const useCardComponent = ({
  checkIfInvalid,
  isLoading,
  saveItem,
  itemId,
}: {
  checkIfInvalid?: () => boolean;
  isLoading?: Ref<boolean>;
  itemId?: MaybeRef<string | number>;
  saveItem: () => Promise<unknown>;
}) => {
  const debouncedIsLoading = refDebounced(isLoading, 300);

  const save = () => {
    if (checkIfInvalid && !checkIfInvalid()) return;
    return saveItem();
  };

  const isNew = computed(() => !itemId.value);

  return {
    debouncedIsLoading,
    isNew,
    save,
  };
};
