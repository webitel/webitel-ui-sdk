import { refDebounced } from '@vueuse/core';
import { Ref } from 'vue';

export const useCardComponent = ({
  checkIfInvalid,
  isLoading,
  saveItem,
  // itemId, // todo: is really needed?
}: {
  checkIfInvalid?: () => boolean;
  isLoading?: Ref<boolean>;
  // itemId?: MaybeRef<string | number>; // todo: is really needed?
  saveItem: () => Promise<unknown>;
}) => {
  const debouncedIsLoading = refDebounced(isLoading, 300);

  const save = () => {
    if (checkIfInvalid && !checkIfInvalid()) return;
    return saveItem();
  };

  return {
    debouncedIsLoading,
    save,
  };
};
