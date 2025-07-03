import { refDebounced } from '@vueuse/core';
import { StoreDefinition, storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';

import { useCardAnyFieldEditedWatcher } from './useCardAnyFieldEditedWatcher';
import { useCardIsNew } from './useCardIsNew';
import { useCardRouting } from './useCardRouting';
import { useCardSaveAction } from './useCardSaveAction';
import { useCardValidation } from './useCardValidation';
import { useItemCardSaveText } from './useItemCardSaveText';

export const useCardComponent = <CardEntity>({
  useCardStore,
}: {
  useCardStore: StoreDefinition;
}) => {
  const cardStore = useCardStore();

  const {
    itemId,
    originalItemInstance,
    validationSchema,
    isLoading,
    // isSaving, // todo: use me
    // error, // todo: use me
  } = storeToRefs(cardStore);

  const { initialize, saveItem, $reset } = cardStore;

  const { routeId } = useCardRouting({
    itemId,
  });

  const { modelValue, validationFields, hasValidationErrors, validate } =
    useCardValidation({ validationSchema });

  const { isAnyFieldEdited } = useCardAnyFieldEditedWatcher({
    value: modelValue,
  });

  const debouncedIsLoading = refDebounced(isLoading, 300);

  const { isNew } = useCardIsNew({
    itemId,
  });

  const { saveText } = useItemCardSaveText({
    isNew,
    isAnyFieldEdited,
  });

  const { save } = useCardSaveAction<CardEntity>({
    // @ts-expect-error
    validate, // fixme: type
    saveItem,
  });

  initialize({
    itemId: routeId.value,
  });

  onUnmounted($reset);

  return {
    // models
    modelValue,

    // state
    debouncedIsLoading,
    originalItemInstance,

    // computed
    isNew,
    saveText,
    hasValidationErrors,
    isAnyFieldEdited,
    validationFields,

    // actions
    save,
  };
};
