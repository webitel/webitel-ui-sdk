import { refDebounced } from '@vueuse/core';
import { type StoreDefinition, storeToRefs } from 'pinia';
import { type Ref, onUnmounted, watch } from 'vue';
import type { RegleSchema } from '@regle/schemas';

import { useCardAnyFieldEditedWatcher } from './useCardAnyFieldEditedWatcher';
import { useCardIsNew } from './useCardIsNew';
import { useCardRouting } from './useCardRouting';
import { useCardSaveAction } from './useCardSaveAction';
import { useCardValidation } from './useCardValidation';
import { useItemCardSaveText } from './useItemCardSaveText';

export const useCardComponent = <CardEntity>({
	useCardStore,
	onLoadErrorHandler,
	manualSetup = false,
}: {
	useCardStore: StoreDefinition;
	onLoadErrorHandler?: (err: unknown) => void;
	/**
	 * When `true` — the composable skips automatic initialization and
	 * `onUnmounted` reset. Use this when you need manual control over
	 * the card lifecycle (e.g. inside `useNestedCardComponent`).
	 *
	 * @default false
	 */
	manualSetup?: boolean;
}) => {
	const cardStore = useCardStore();

	const {
		itemId,
		originalItemInstance,
		validationSchema,
		isLoading,
		// isSaving, // todo: use me
		error,
	} = storeToRefs(cardStore);

	const { initialize, saveItem, $reset } = cardStore;

	const { modelValue, validationFields, hasValidationErrors, validate } =
		useCardValidation<CardEntity>({
			validationSchema: validationSchema as Ref<RegleSchema<CardEntity>>,
		});

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

	if (!manualSetup) {
		const { routeId } = useCardRouting({
			itemId,
		});
		initialize({
			itemId: routeId.value,
		});
		onUnmounted($reset);
	}

	watch(error, (err) => {
		if (onLoadErrorHandler) onLoadErrorHandler(err);
	});

	return {
		// models
		modelValue,

		// state
		debouncedIsLoading,
		originalItemInstance,
		error,

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
