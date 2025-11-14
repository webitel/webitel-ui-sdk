import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useCachedItemInstanceName } from '../useCachedItemInstanceName/useCachedItemInstanceName.js';

export const useCardComponent = (params) => {
  const {
    id,
    itemInstance,
    invalid,

    loadItem,
    addItem,
    updateItem,
    setId,
    resetState,
    onLoadErrorHandler,
  } = params;

  const router = useRouter();
  const route = useRoute();
  const { t } = useI18n();

  const { name: pathName } = useCachedItemInstanceName(itemInstance);

  const isLoading = ref(true);

  const isNew = computed(() => route.params.id === 'new');
  const disabledSave = computed(() => {
    return invalid?.value || !itemInstance.value._dirty;
  });

  const saveText = computed(() => {
    return isNew.value || itemInstance.value._dirty
      ? t('reusable.save')
      : t('reusable.saved');
  });

  const redirectToEdit = () => {
    return router.replace({
      ...route,
      params: { id: id?.value },
    });
  };

  const save = async () => {
    if (disabledSave.value) return;

    if (isNew.value) {
      await addItem();
    } else {
      await updateItem();
    }

    if (id?.value) {
      await redirectToEdit();
    }
  };

  async function initializeCard() {
    try {
      isLoading.value = true;
      const { id } = route.params;
      await setId(id);
      await loadItem();
    } catch (err) {
      if (!onLoadErrorHandler) throw err;
        onLoadErrorHandler(err)
    } finally {
      isLoading.value = false;
    }
  }

  function initialize() {
    onUnmounted(() => {
      resetState();
    });

    return initializeCard();
  }

  return {
    id,
    isLoading,
    itemInstance,
    isNew,
    pathName,
    disabledSave,
    saveText,

    save,
    initializeCard,
    initialize,
  };
};
