import { RegleSchemaBehaviourOptions,useRegleSchema } from '@regle/schemas';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { ApiModule } from '@webitel/ui-sdk/api/types/ApiModule.type';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const createFormStore = <Entity = object>({
  namespace,
  apiModule,
  standardValidationSchema,
  validationSchemaOptions,
}: {
  namespace: string;
  apiModule: ApiModule<Entity>;
  standardValidationSchema?: StandardSchemaV1 | null;
  validationSchemaOptions?: RegleSchemaBehaviourOptions;
}) => {
  return defineStore(namespace, () => {
    // form data vars
    const parentId = ref<string | number | null>();
    const itemId = ref<string | number | null>();
    const itemInstance = ref<Entity>({} as Entity); // mb rename to formData? – in case of multiple stores for 1 main item instance

    // form state vars
    const validationSchema = ref();

    // processing progress vars
    const isLoading = ref(false);
    const isSaving = ref(false);
    const error = ref(null); // if needed

    if (standardValidationSchema) {
      validationSchema.value = useRegleSchema(
        itemInstance,
        standardValidationSchema,
        { ...validationSchemaOptions, autoDirty: false },
      );
    }

    const loadItem = async () => {
      isLoading.value = true;
      try {
        const loadedItemInstance = await apiModule.get({
          id: itemId.value,
          itemId: itemId.value, // compat, use "id" instead
          parentId: parentId.value,
        });

        itemInstance.value = loadedItemInstance;
      } catch (err) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    };

    const saveItem = async () => {};

    const initializeItemInstance = async () => {
      if (itemId.value) {
        await loadItem();
      } else {
        // todo: fill with defaults from zod schema
        itemInstance.value = {} as Entity;
      }
    };

    const initialize = ({
      itemInstance: initialItemInstance,
      itemId: initialItemId,
      parentId: initialParentId,
    }: {
      itemInstance?: Entity;
      itemId?: string | number;
      parentId?: string | number;
    } = {}) => {
      if (initialParentId) {
        parentId.value = initialParentId;
      }

      if (initialItemId) {
        itemId.value = initialItemId;
      }

      if (initialItemInstance) {
        itemInstance.value = initialItemInstance;
      } else {
      } // todo: ??

      return initializeItemInstance();
    };

    return {
      parentId,
      itemId,
      itemInstance,

      validationSchema,

      isLoading,
      isSaving,
      error,

      initialize,
      saveItem,
    };
  });
};
