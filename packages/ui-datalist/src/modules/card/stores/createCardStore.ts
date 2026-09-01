import type { RegleBehaviourOptions } from '@regle/core';
import {
	type RegleSchemaBehaviourOptions,
	useRegleSchema,
} from '@regle/schemas';
import { getDefaultsFromZodSchema } from '@webitel/api-services/utils';
import type { ApiModule } from '@webitel/ui-sdk/src/api/types/ApiModule';
import { defineStore } from 'pinia';
import type { MaybeRef } from 'vue';
import { effectScope, ref, toRaw, toValue, watch } from 'vue';
import type { z } from 'zod/v4';

import type { CardItemId, CardParentId } from '../types/CardStore.types';

const defaultRegleValidationOptions: RegleSchemaBehaviourOptions &
	RegleBehaviourOptions = {
	autoDirty: true, // compute errors only on $validate() fn (btn click)
	syncState: {
		onValidate: true, // make zod defaults fill state
	},
};

export const createCardStore = <
	Entity extends {
		id?: string | number;
	} = {
		id?: string | number;
	},
>({
	namespace,
	apiModule,
	standardValidationSchema,
	validationSchemaOptions,
}: {
	namespace: string;
	standardValidationSchema: MaybeRef<z.ZodType>;
	/**
	 * Every method on {@link ApiModule} is optional, but a card store reads and
	 * writes one item, so these three are required here.
	 */
	apiModule: ApiModule<Entity> &
		Required<Pick<ApiModule<Entity>, 'get' | 'add' | 'update'>>;
	validationSchemaOptions?: RegleSchemaBehaviourOptions;
}) => {
	return defineStore(namespace, () => {
		// card data vars
		const parentId = ref<CardItemId>();
		const itemId = ref<CardParentId>();

		// readonly, state on backend
		const originalItemInstance = ref<Readonly<Entity>>({} as Entity);

		// draft, changeable using ui controls, but not saved yet
		const draftItemInstance = ref<Entity>({} as Entity);

		/**
		 * sync draft to original, after original changes
		 * NOTE! it's only 1 way binding
		 */
		watch(originalItemInstance, (value) => {
			draftItemInstance.value = structuredClone(toRaw(value));
		});

		// card state vars
		const validationSchema = ref();

		// processing progress vars
		const isLoading = ref(false);
		const isSaving = ref(false);
		const error = ref<unknown>(null); // if needed

		// @regle/core auto-binds to whatever effect scope is active on first
		// useRegleSchema() call — here, the opening card component's. It then
		// tears r$ down when THAT unmounts, even though this store outlives it.
		// A detached scope keeps regle alive for the store's lifetime
		let validationScope: ReturnType<typeof effectScope>;
		const createValidationSchema = () => {
			validationScope?.stop();
			validationScope = effectScope(true);
			validationScope.run(() => {
				validationSchema.value = useRegleSchema(
					draftItemInstance,
					standardValidationSchema,
					{
						...defaultRegleValidationOptions,
						...validationSchemaOptions,
					},
				);
			});
		};
		createValidationSchema();

		const loadItem = async () => {
			isLoading.value = true;
			try {
				originalItemInstance.value = await apiModule.get({
					id: itemId.value,
					itemId: itemId.value, // compat, use "id" instead
					parentId: parentId.value,
				});
			} catch (err) {
				error.value = err;
				throw err;
			} finally {
				isLoading.value = false;
			}
		};

		const createItem = ({
			data,
			parentId,
		}: {
			data: Entity;
			parentId?: string | number | null;
		}) => {
			return apiModule.add({
				itemInstance: data,
				parentId,
			});
		};
		const updateItem = ({
			data,
			itemId,
			parentId,
		}: {
			data: Entity;
			itemId: string | number | null;
			parentId?: string | number | null;
		}) => {
			return apiModule.update({
				itemInstance: data,
				itemId,
				parentId,
			});
		};

		const saveItem = async (draft: Entity) => {
			let responseItem: Entity; // use response after add/update instead of sending "get" request

			if (itemId.value) {
				responseItem = await updateItem({
					data: draft,
					itemId: itemId.value,
					parentId: parentId.value,
				});
			} else {
				responseItem = await createItem({
					data: draft,
					parentId: parentId.value,
				});
			}

			originalItemInstance.value = responseItem;
			itemId.value = responseItem.id;
		};

		const initializeItemInstance = async () => {
			if (itemId.value) {
				await loadItem();
			} else if (standardValidationSchema) {
				draftItemInstance.value = await getDefaultsFromZodSchema(
					toValue(standardValidationSchema),
					draftItemInstance.value,
				);
			} else {
				draftItemInstance.value = {} as Entity;
			}
		};

		const initialize = ({
			itemId: initialItemId,
			parentId: initialParentId,
		}: {
			itemId?: string | number;
			parentId?: string | number;
		} = {}) => {
			if (initialParentId) {
				parentId.value = initialParentId;
			}

			if (initialItemId && initialItemId !== 'new') {
				itemId.value = initialItemId;
			}

			return initializeItemInstance();
		};

		const $reset = () => {
			itemId.value = null;
			parentId.value = null;
			createValidationSchema();

			originalItemInstance.value = {} as Entity;

			isLoading.value = false;
			isSaving.value = false;
			error.value = null;
		};

		return {
			parentId,
			itemId,
			originalItemInstance,
			draftItemInstance,

			validationSchema,

			isLoading,
			isSaving,
			error,

			initialize,
			saveItem,
			$reset,
		};
	});
};
