import { computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useCachedItemInstanceName } from '../useCachedItemInstanceName/useCachedItemInstanceName.js';

export const useCardComponent = (params) => {
  const { id,
    itemInstance,
    invalid,

    loadItem,
    addItem,
    updateItem,
    setId,
    resetState } = params;

  const router = useRouter();
  const route = useRoute();
  const { t } = useI18n();

  const { name: pathName } = useCachedItemInstanceName(itemInstance);

  const isNew = computed(() => route.params.id === 'new');
  const disabledSave = computed(() => {
    return invalid?.value || !itemInstance.value._dirty;
  });

  const saveText = computed(() => {
    return isNew.value || itemInstance.value._dirty ? t('reusable.save') : t('reusable.saved');
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
      const { id } = route.params;
      await setId(id);
      await loadItem();
    } catch (error) {
      console.error(error);
    }
  }

  function initialize(){
    onMounted(() => {
      initializeCard();
    });

    onUnmounted(() => {
      resetState();
    });
  }


  return {
    id,
    itemInstance,
    isNew,
    pathName,
    disabledSave,
    saveText,

    save,
    initializeCard,
    initialize,
  }
}


