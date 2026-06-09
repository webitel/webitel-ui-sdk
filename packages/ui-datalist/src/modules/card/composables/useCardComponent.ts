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
	routeParamName = 'id',
}: {
	useCardStore: StoreDefinition;
	onLoadErrorHandler?: (err: unknown) => void;
	/**
	 * Route param name for the card item id. Defaults to 'id'.
	 *
	 * When set to any value other than 'id' — automatically enables nested-card
	 * (popup) mode: watches the route param and reads the parent id from
	 * `route.params.id`.
	 *
	 * Top-level card (default):   routeParamName = 'id'
	 * Nested popup card:          routeParamName = 'conditionId' | 'statusConditionId' | …
	 */
	routeParamName?: string;
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

	const { routeId, isNestedCard, parentId } = useCardRouting({
		itemId,
		routeParamName,
	});

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

	if (isNestedCard) {
		// Nested card mode (popup): watch routeId, reset when popup closes
		watch(
			routeId,
			(value) => {
				if (value) {
					initialize({
						itemId: value === 'new' ? null : value,
						parentId: parentId.value,
					});
				} else {
					$reset();
				}
			},
			{
				immediate: true,
			},
		);
	} else {
		// Top-level card: initialize once, reset on unmount
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
