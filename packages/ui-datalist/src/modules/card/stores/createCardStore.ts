import {RegleBehaviourOptions} from "@regle/core";
import { RegleSchemaBehaviourOptions,useRegleSchema } from '@regle/schemas';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import { syncRefs } from "@vueuse/core";
import { ApiModule } from '@webitel/ui-sdk/api/types/ApiModule.type';
import { defineStore } from 'pinia';
import {ref} from 'vue';

const defaultRegleValidationOptions: RegleSchemaBehaviourOptions & RegleBehaviourOptions = {
  autoDirty: false, // compute errors only on $validate() fn (btn click)
  syncState: {
    onValidate: true, // make zod defaults fill state
  },
};

type State = {
  isLoading: boolean;
};

export const createCardStore = <Entity = object>({
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
  return defineStore<string, State>(namespace, () => {
    // card data vars
    const parentId = ref<string | number | null>();
    const itemId = ref<string | number | null>();

    // readonly, state on backend
    const originalItemInstance = ref<Readonly<Entity>>();

    // draft, changeable using ui controls, but not saved yet
    const draftItemInstance = ref<Entity>({} as Entity);

    /**
     * sync draft to original, after original change
     * NOTE! it's only 1 way binding
     */
    syncRefs(originalItemInstance, draftItemInstance);

    // card state vars
    const validationSchema = ref();

    // processing progress vars
    const isLoading = ref(false);
    const isSaving = ref(false);
    const error = ref(null); // if needed

    if (standardValidationSchema) {
      validationSchema.value = useRegleSchema(
        draftItemInstance,
        standardValidationSchema,
        { ...defaultRegleValidationOptions, ...validationSchemaOptions },
      );
    }

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

      if (initialItemId) {
        itemId.value = initialItemId;
      }

      return initializeItemInstance();
    };

    return {
      // parentId,
      // itemId,
      // originalItemInstance,
      // draftItemInstance,

      // validationSchema,

      isLoading: false,
      // smthG: (s: State) => 1, // just example
      //   smthA: (s: State) => 'smth',
      // isSaving,
      // error,

      // initialize,
      // saveItem,
    };
  });
};
