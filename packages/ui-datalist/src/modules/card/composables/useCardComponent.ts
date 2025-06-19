import { RegleSchemaResult } from '@regle/schemas';
import { refDebounced } from '@vueuse/core';
import {computed, Ref} from 'vue';

export const useCardComponent = ({
  validate,
  isLoading,
  saveItem,
  itemId,
}: {
  validate?: () => Promise<RegleSchemaResult<unknown>>;
  isLoading?: Ref<boolean>;
  itemId?: Ref<string | number>;
  saveItem: () => Promise<unknown>;
}) => {
  const debouncedIsLoading = refDebounced(isLoading, 300);

  const save = async () => {
    const hasErrors = await validate();
    if (hasErrors) return;

    return saveItem();
  };

  const isNew = computed(() => !itemId.value);

  return {
    debouncedIsLoading,
    isNew,
    save,
  };
};
